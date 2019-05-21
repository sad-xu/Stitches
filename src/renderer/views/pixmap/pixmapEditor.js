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
