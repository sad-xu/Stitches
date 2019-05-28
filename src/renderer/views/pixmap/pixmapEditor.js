import * as THREE from 'three'

export function initCube () {
  const container = document.getElementById('pixmap-container')

  const camera = new THREE.PerspectiveCamera(70, 1, 1, 1000)
  camera.position.z = 5

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)

  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(300, 300)

  container.appendChild(renderer.domElement)

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)
  const animate = () => {
    requestAnimationFrame(animate)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    renderer.render(scene, camera)
  }
  animate()
}

let camera, scene, renderer
let WIDTH, HEIGHT
let plane
let mouse, raycaster
let isShiftDown = false
let rollOverMesh, rollOverMaterial
let cubeGeo, cubeMaterial
let objects = []

function init() {
  const container = document.getElementById('pixmap-container')
  WIDTH = container.offsetWidth
  HEIGHT = container.offsetHeight
  // 设置摄像机投影模式
  camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 10000)
  // 摄像机位置
  camera.position.set(500, 800, 1300)
  // 朝向原点
  camera.lookAt(0, 0, 0)
  // 创建场景
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf0f0f0)
  // 缓冲立方体 roll-over helpers
  let rollOverGeo = new THREE.BoxBufferGeometry(50, 50, 50)
  // 材质
  rollOverMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, opacity: 0.5, transparent: true})
  // 立方体虚影
  rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial)
  // 添加到当前场景的子级
  scene.add(rollOverMesh)
  // cubes
  cubeGeo = new THREE.BoxBufferGeometry(50, 50, 50)
  cubeMaterial = new THREE.MeshBasicMaterial({color: 0xfeb74c})
  // 坐标格辅助 grid
  let gridHelper = new THREE.GridHelper(1000, 20)
  scene.add(gridHelper)
  // 光线投射
  raycaster = new THREE.Raycaster()
  mouse = new THREE.Vector2()
  // 平面缓冲几何 - 地面
  let geometry = new THREE.PlaneBufferGeometry(1000, 1000)
  geometry.rotateX(-Math.PI / 2)
  plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({visible: false}))
  scene.add(plane)
  objects.push(plane)
  // 环境光 均匀照亮 lights
  let ambientLight = new THREE.AmbientLight(0x606060)
  scene.add(ambientLight)
  // 平行光
  let directionalLight = new THREE.DirectionalLight(0xffffff)
  directionalLight.position.set(1, 0.75, 0.5).normalize()
  scene.add(directionalLight)
  // 渲染器 - 抗锯齿
  renderer = new THREE.WebGLRenderer({antialias: true})
  // 像素比 - 避免HiDPI设备绘图模糊
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(WIDTH, HEIGHT)
  container.appendChild(renderer.domElement)
  document.addEventListener('mousemove', onDocumentMouseMove, false)
  document.addEventListener('mousedown', onDocumentMouseDown, false)
  document.addEventListener('keydown', onDocumentKeyDown, false)
  document.addEventListener('keyup', onDocumentKeyUp, false)
  //
  window.addEventListener('resize', onWindowResize, false)
}

function onWindowResize() {
  camera.aspect = WIDTH / HEIGHT
  camera.updateProjectionMatrix()
  renderer.setSize(WIDTH, HEIGHT)
}

// 鼠标移动，出现方块虚影
function onDocumentMouseMove(event) {
  event.preventDefault()
  mouse.set((event.clientX / WIDTH) * 2 - 1, -(event.clientY / HEIGHT) * 2 + 1)
  // 更新射线
  raycaster.setFromCamera(mouse, camera)
  // 与射线相交的物体 - 鼠标所在的方块
  let intersects = raycaster.intersectObjects(objects)
  if (intersects.length > 0) {
    let intersect = intersects[0]
    rollOverMesh.position.copy(intersect.point).add(intersect.face.normal)
    // position / 50 * 50 + 25
    rollOverMesh.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25)
  }
  render()
}

// 点击 -> 添加方块
// shift + 点击 -> 删除方块
function onDocumentMouseDown(event) {
  event.preventDefault()
  mouse.set((event.clientX / WIDTH) * 2 - 1, -(event.clientY / HEIGHT) * 2 + 1)
  raycaster.setFromCamera(mouse, camera)
  var intersects = raycaster.intersectObjects(objects)
  if (intersects.length > 0) {
    let intersect = intersects[0]
    if (isShiftDown) { // delete cube
      if (intersect.object !== plane) {
        scene.remove(intersect.object)
        objects.splice(objects.indexOf(intersect.object), 1)
      }
    } else { // create cube
      let voxel = new THREE.Mesh(cubeGeo, cubeMaterial)
      voxel.position.copy(intersect.point).add(intersect.face.normal)
      voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25)
      scene.add(voxel)
      objects.push(voxel)
    }
    render()
  }
}

// 监听shift按键
function onDocumentKeyDown(event) {
  switch (event.keyCode) {
    case 16: isShiftDown = true
      break
  }
}
function onDocumentKeyUp(event) {
  switch (event.keyCode) {
    case 16: isShiftDown = false
      break
  }
}

function render() {
  renderer.render(scene, camera)
}

export function initPixmapEditor() {
  init()
  render()
}
