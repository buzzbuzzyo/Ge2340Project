/*AI ChatBot by Anuj Upadhyay

Here is a real AI chatbot where you can train the bot yourself! Talk to it and decide wether or not its response is good!

I have already given it some training data to start with.

I hope you like it!

*/
window.addEventListener('load', function(){

var chat = document.getElementById("chatButton");
var no = document.getElementById("noButton");
var yes = document.getElementById("yesButton");
var txt = document.getElementById("textBox");
var confirm = document.getElementById("confirmation");
var help = document.getElementById("helpBox");
var helpBtn = document.getElementById("helpButton");
var trainingArea = document.getElementById("trainArea");
var botResponse = ["Hello! I hope you have a good day!","I am fine, thanks!","I have no name, but my creators name is Anuj Upadhyay!","42","I was created in december, 2018.","I am not human, I am a robot."];
var divArr=[];
var delayVar=0;

function newDiv(COLOR, TEXT){
var newdiv = document.createElement("div");

newdiv.style.width = "90%";
newdiv.style.height = "10%";
newdiv.style.background = COLOR;
if(COLOR=="green"){
	newdiv.style.left="53%";
}
else{
	newdiv.style.left="47%";
}
newdiv.style.bottom="15%";
newdiv.style.position="fixed";
newdiv.style.borderRadius="10px";
newdiv.style.transform="translate(-50%,0)";
newdiv.style.paddingLeft ="10px";
newdiv.style.paddingTop ="5px";
newdiv.style.fontFamily="	Verdana, Times, serif";
newdiv.innerHTML = TEXT;
newdiv.style.border = "1px solid black";
newdiv.style.color="white";
document.body.appendChild(newdiv);

divArr.push(newdiv);

for (y=0;y<divArr.length-1;y++){
	if (divArr[y].style.bottom=="15%"){
	divArr[y].style.bottom="28%";
}
else if (divArr[y].style.bottom=="28%"){
	divArr[y].style.bottom="41%";
}
else if (divArr[y].style.bottom=="41%"){
	divArr[y].style.bottom="54%";
}
else if (divArr[y].style.bottom=="54%"){
	divArr[y].style.bottom="67%";
}
else if (divArr[y].style.bottom=="67%"){
	divArr[y].style.bottom="80%";
}
else if (divArr[y].style.bottom=="80%"){
	divArr[y].style.bottom="93%";
}
else if (divArr[y].style.bottom=="93%"){
	divArr[y].style.bottom="106%";
}
else if(divArr[y].style.bottom=="106%"){
	divArr[y].style.display="none";
}
}


}
/*
newDiv("green","Who are you?");
newDiv("orange","I am a bot.");
*/
//***********Machine learning**************
var net = new brain.NeuralNetwork();
var trainSet = [];
var maxLen = 0;
var commands = 7;

//Greeting
trainSet.push({ input: textToBinary("Hi"), output: {[0]: 1} }); //HI
trainSet.push({ input: textToBinary("Hey"), output: {[0]: 1} }); //HEY
trainSet.push({ input: textToBinary("Hello"), output: {[0]: 1} }); //HELLO
trainSet.push({ input: textToBinary("Anyone?"), output: {[0]: 1} }); //Yo 
																													 
//How are you?
trainSet.push({ input: textToBinary("How are you?"), output: {[1]: 1} }); //How are you?

trainSet.push({ input:  textToBinary("Are you ok?"), output: {[1]: 1} }); //Are you ok?

//What is your name?
trainSet.push({ input:  textToBinary("What is your name?"), output: {[2]: 1} }); //What is your name?
trainSet.push({ input:  textToBinary("Name?"), output: {[2]: 1} }); //Whats your name?
trainSet.push({ input:  textToBinary("What's your name?"), output: {[2]: 1} }); //Whats ur name?
trainSet.push({ input:  textToBinary("Your name?"), output: {[2]: 1} }); //Your name?
trainSet.push({ input:  textToBinary("Who is this?"), output: {[2]: 1} }); //Who are you?
trainSet.push({ input:  textToBinary("What are you?"), output: {[2]: 1} }); //Name?
																																																								   																														 
//Are you human?
trainSet.push({ input:  textToBinary("Are you human?"), output: {[5]: 1} }); //Are you human?
trainSet.push({ input:  textToBinary("Human?"), output: {[5]: 1} }); //human?

for (i=0; i< trainSet.length; i++){
	if (trainSet[i].input.length < maxLen){
		var remainingLength = maxLen - trainSet[i].input.length;
		trainSet[i].input = trainSet[i].input.concat(Array(remainingLength).fill(0));
	}
}

//Training
net.train(trainSet, {
	errorThresh: 0.005,  // error threshold to reach before completion
	log: false,           // console.log() progress periodically 
	logPeriod: 10,       // number of iterations between logging 
	learningRate: 0.3    // learning rate 
}); //Using all the training data to train the AI


//Chat button
chat.addEventListener("click",function(){

	if (txt.value != ""){
		newDiv("green",txt.value);
		var data = textToBinary(txt.value);
		var result = brain.likely(data, net);
		console.log(result);
		setTimeout(function(){
		newDiv("orange",botResponse[result]);
		trainingArea.style.display="inline";
		},800);
	
	}

});

yes.addEventListener("click", function(){
	alert("Good! I hope you enjoy talking to me!");
   	txt.value="";
   help.style.display = "none";
	helpBtn.style.display = "none";
	trainingArea.style.display="none";
})

no.addEventListener("click", function(){
	alert("Oh, I am sorry! What would be a good response to your input?");
divArr[divArr.length-1].style.backgroundColor="#ff6666"
help.style.display = "inline";
helpBtn.style.display = "inline";
})

helpBtn.addEventListener("click", function(){
	trainingArea.style.display="none";
	botResponse.push(help.value);
	var newInput = textToBinary(txt.value);
	trainData.push({ input: newInput, output: {[commands]: 1} }); //user training data
	commands++;
	//Training the AI
	net.train(trainData, {
		log: false,
		logPeriod: 10,
		errorThresh: 0.0005,
	});
	alert("Thank you! I will talk smarter!");
		txt.value="";
		help.value="";
	help.style.display = "none";
		helpBtn.style.display = "none";
})

function textToBinary(input){
	input = input.toUpperCase();
	var text = [];
	var code = "";
	for (i=0;i<input.length;i++){
		code += input[i].charCodeAt(0).toString(2);
	}
	for(i=0;i<code.length;i++){
		text = text.concat([parseInt(code[i])]);
	}
	if (text.length > maxLen){
		maxLen = text.length;
		console.log(maxLen);
	} 
	else{
		text = text.concat(Array(maxLen - text.length).fill(0));
	}
	console.log(input)
	console.log(text)
	return text;
}
});