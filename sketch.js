var database ,dog,dogImg,happydogImg,garden,washroom, database
var position
//var form
var feed,add
var foodobj
var Feedtime
var Lastfeed
var gameState,readState;
//Create variables here

function preload()

{
  dog1 = loadImage("images/dogImg.png")
  happydogImg = loadImage("images/dogImg1.png")
  sadDog=loadImage("images/Dog.png");
  happyDog=loadImage("images/happy dog.png");
  garden=loadImage("images/Garden.png");
  washroom=loadImage("images/Wash Room.png");
  bedroom=loadImage("images/Bed Room.png");
	//load images here
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();

  foodobj=new Food()
  dog = createSprite(560,240,8,8);
  dog.addImage(sadDog)
  dog.scale=0.2
  
 

  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);
  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
feed = createButton("FEED DRAGO")
feed.mousePressed(feedDog)
feed.position(500,15)
add = createButton("ADD FOOD")
add.position(400,15)
add.mousePressed(AddFood)

} 



function draw(){
  currentTime=hour();
  if(currentTime==(Lastfeed+1)){
      update("Playing");
      foodObj.garden();
   }else if(currentTime==(Lastfeed+2)){
    update("Sleeping");
      foodObj.bedroom();
   }else if(currentTime>(Lastfeed+2) && currentTime<=(Lastfeed+4)){
    update("Bathing");
      foodObj.washroom();
   }else{
    update("Hungry")
    foodobj.display();
   }
   
   if(gameState!="Hungry"){
     feed.hide();
     add.hide();
     dog.remove();
   }else{
    feed.show();
    add.show();
 { background(46,139,87);
 foodobj.display()
 
 }
}
 drawSprites();
  
  fill(255,255,254);
 textSize(15);

  // text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
 
  //add styles here
drawSprites();
}
function readPosition(data){
  position = data.val();
  foodobj.updateFoodStock(position)
  
}

function showError(){
}

function writePosition(x){
  if(x>0){
    x=x-1
  }
  else{
    x=0
  }
  database.ref('/').set({
    'Food': x
  })

}
function AddFood(){
position++
database.ref('/').update({
  Food:position
}

)
}
function feedDog(){
dog.addImage(happyDog)
foodobj.updateFoodStock(foodobj.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobj.getFoodStock(),
   FeedTime:hour ()
 })
}
function update(state){
  database.ref('/').update({
    gameState:state
  });
}