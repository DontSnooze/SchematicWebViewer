import * as THREE from "https://cdn.skypack.dev/pin/three@v0.131.3-QQa34rwf1xM5cawaQLl8/mode=imports/optimized/three.js"

var whiteColor = new THREE.Color( 0xffffff )
var redColor = new THREE.Color( 0xff0000 )
var greenColor = new THREE.Color( 0x00ff00 )
var blueColor = new THREE.Color( 0x0000ff )
var geometry = new THREE.BoxBufferGeometry(1, 1, 1)

// 2: Grass
function Grass() {
	const block = new SixImageBlock(
		'BlockTextures/grass/grass_side.png', 
		'BlockTextures/grass/grass_side.png',
		'BlockTextures/grass/grass_top.png',
		'BlockTextures/dirt/dirt.png',
		'BlockTextures/grass/grass_side.png',
		'BlockTextures/grass/grass_side.png'
	)

	this.mesh = block.mesh
}

// 3: Dirt
function Dirt() {
	const block = new OneImageBlock('BlockTextures/dirt/dirt.png')
	this.mesh = block.mesh
}

// 9: Water
function Water() {
	const block = new EmptyBlock(blueColor)
	this.mesh = block.mesh
}

// 20: Glass
function Glass() {
	const glassBlock = new OneImageBlock('BlockTextures/glass/glass.png')
	this.mesh = glassBlock.mesh
}

// 33: Piston
function Piston() {
	const glassBlock = new SixImageBlock(
		'BlockTextures/piston/piston_side.png', 
		'BlockTextures/piston/piston_side.png',
		'BlockTextures/piston/piston_head.png',
		'BlockTextures/piston/piston_back.png',
		'BlockTextures/piston/piston_side.png',
		'BlockTextures/piston/piston_side.png'
	)

	this.mesh = glassBlock.mesh
}

// 42: Iron Block
function IronBlock() {
	const block = new OneImageBlock('BlockTextures/iron_block/iron_block.png')
	this.mesh = block.mesh
}

// 44: Stone slab
// 54: Chest
function Chest() {
	const glassBlock = new SixImageBlock(
		'BlockTextures/chest/chest_back.png', 
		'BlockTextures/chest/chest_back.png',
		'BlockTextures/chest/chest_top.png',
		'BlockTextures/chest/chest_top.png',
		'BlockTextures/chest/chest_back.png',
		'BlockTextures/chest/chest_front.png'
	)

	this.mesh = glassBlock.mesh
}

// 68: Wall sign

// 77 Stone button

// 96 Trap door
// -117: Cobbleston wall (139 - 256)
// -102: Hopper (154 - 256)

function blockFromType(blockType) {
	switch (blockType) {
		case 2:
			return new Grass()
    		break;
    	case 3:
			return new Dirt()
    		break;
    	case 9:
			return new Water()
    		break;
		case 20:
			return new Glass()
    		break;
    	case 33:
			return new Piston()
    		break;
    	case 42:
			return new IronBlock()
    		break;
    	case 54:
			return new Chest()
    		break;
    	default:
    		return new EmptyBlock()
	}	
}

function OneImageBlock(imagePath) {
	// Causing a resize warning in console

	const loader = new THREE.TextureLoader()

	const texture = loader.load( imagePath )
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set( 1, 1 );
	texture.minFilter = THREE.LinearFilter

	const material = new THREE.MeshBasicMaterial( { 
		transparent: true,
		map: texture 
	} );

	this.mesh = new THREE.Mesh(
		geometry,
		material
	)

	// no warning but uses more resources
	// const block = new SixImageBlock(imagePath, imagePath, imagePath, imagePath, imagePath, imagePath)
	// this.mesh = block.mesh
}

function SixImageBlock(pxImagePath, nxImagePath, pyImagePath, nyImagePath, pzImagePath, nzImagePath) {
	let loader = new THREE.TextureLoader();

	const pxTexture = loader.load(pxImagePath)
	pxTexture.minFilter = THREE.LinearFilter

	const nxTexture = loader.load(nxImagePath)
	nxTexture.minFilter = THREE.LinearFilter

	const pyTexture = loader.load(pyImagePath)
	pyTexture.minFilter = THREE.LinearFilter

	const nyTexture = loader.load(nyImagePath)
	nyTexture.minFilter = THREE.LinearFilter

	const pzTexture = loader.load(pzImagePath)
	pzTexture.minFilter = THREE.LinearFilter

	const nzTexture = loader.load(nzImagePath)
	nzTexture.minFilter = THREE.LinearFilter

	let materialArray = [
	    new THREE.MeshBasicMaterial( { map: pxTexture, transparent: true } ),
	    new THREE.MeshBasicMaterial( { map: nxTexture, transparent: true } ),
	    new THREE.MeshBasicMaterial( { map: pyTexture, transparent: true } ),
	    new THREE.MeshBasicMaterial( { map: nyTexture, transparent: true } ),
	    new THREE.MeshBasicMaterial( { map: pzTexture, transparent: true } ),
	    new THREE.MeshBasicMaterial( { map: nzTexture, transparent: true } )
	];

	this.mesh = new THREE.Mesh(
		geometry,
		materialArray
	)
}

function EmptyBlock(color = whiteColor) {
    this.mesh = new THREE.Mesh(
        geometry,

        // basic material to our mesh
        new THREE.MeshBasicMaterial ({
          color: color,
          transparent: true,
          opacity: 0.7
        })
    )

    // wireframe
    var geo = new THREE.EdgesGeometry( this.mesh.geometry )
    // linewidth does nothing right now
    var mat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 0.25 } )
    var wireframe = new THREE.LineSegments( geo, mat )
    wireframe.renderOrder = 1 // make sure wireframes are rendered 2nd
    this.mesh.add( wireframe )
}

export { blockFromType, EmptyBlock, Grass, Glass, Water, Dirt, Piston, IronBlock, Chest };
