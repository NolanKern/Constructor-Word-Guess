var letter = function(lett){
	this.charac = lett;
	this.appear = false;
	this.letterRender = function(){
		return (this.appear) ? this.charac : "_ ";
	};
};

//export the constructor
module.exports = letter;