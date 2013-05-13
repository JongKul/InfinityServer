

function RoomDataInfo(){ 
	this.data = [];	
}


RoomDataInfo.prototype.parse =function(dataString) {

	var temp = dataString.split(',');		
	for(var j = 0 ; j < 8 ; j++) {		
		var row = [];
		for(var i = 0 ; i < 8 ; i++){
			row.push(parseInt(temp[j*8+i]));					
		}
		
		this.data.push(row);
	}
	

}

RoomDataInfo.prototype.print=function() {
	
	var string= "";
	for(var j = 0 ; j < 8 ; j++) {
		string ="";
		for(var i = 0 ; i < 8 ; i++){		
					
			if(this.data[j][i] == -1) {
				string = string.concat('x '); 
			}
			else if(this.data[j][i] == 1) {
				string = string.concat('w ');
			}
			else {
				string = string.concat('b ');
			}
										
																			
		}
		console.log(string);		
	}
	
	return string;	
}

RoomDataInfo.prototype.toString=function() {
	var string ="";

	for(var j = 0 ; j < 8 ; j++) {
		for(var i = 0 ; i < 8 ; i++){
		
			if(!(j == 0 && i ==0))string = string.concat(',');	
			string = string.concat(this.data[j][i]);							
		}
	}	
	
	return string;	
}

RoomDataInfo.prototype.isFull = function() {
	for(var j = 0 ; j < 8 ; j++) {		
		for(var i = 0 ; i < 8 ; i++){
			if(this.data[j][i] == -1) {
				return false;
			}				
		}
	}
	return true;
}
RoomDataInfo.prototype.getWinner = function() {
	var whiteCount = 0;
	var blackCount = 0;
	color = parseInt(color);
	for(var j = 0 ; j < 8 ; j++) {		
		for(var i = 0 ; i < 8 ; i++){
			if(this.data[j][i] == 0) {
				blackCount++
			}				
			else {
				whiteCount++;
			}
		}
	}
	
	if(whiteCount>= blackCount) {
		return 1;
	}
	else if(whiteCount< blackCount)  {
		return 0;	
	}
	else {
		return -1;
	}
	
}


RoomDataInfo.prototype.turn= function(x,y,color) {
	var changedCount = 0;	
	x = parseInt(x);
	y = parseInt(y);
	color = parseInt(color);
	if(this.data[y][x] != -1) return new Error('cannot put here');
	
	var i = 0, j = 0;;
	var putcolor;
	//x++
	
	existX = -1;
	existY = -1;	
	
	for(i = x+1;i<8 ;i++ ){
		putcolor= this.data[y][i];		
		if(putcolor == -1 ) break;
		if(putcolor == color) {
			existX = i;
			existY = j;				
			break;
		}	 
	}
	if(existX >= 0) {
		for( i = x+1;  i< existX ; i++ ){
			putcolor= this.data[y][i];
			if(putcolor != color) {
				this.data[y][i] = color;
				changedCount++;
			}
		}
	}
	//console.log('x++ : ' + changedCount);
	//x--
	existX = -1;
	for( i = x-1  ; i  >=  0; i-- ){
		putcolor= this.data[y][i];
		if(putcolor == -1 ) break;
		if(putcolor == color) {
			existX = i;				
			break;
		}	 
	}
	if(existX >= 0) {
		for( i = x-1  ; i  >=  existX; i-- ){
			putcolor= this.data[y][i];
			if(putcolor != color) {
				this.data[y][i] = color;
				changedCount++;
			}
		}
	}
	//console.log('x-- : ' + changedCount);
	//y++
	
	existX = -1;
	existY = -1;	
	for(j = y+1; j< 8  ;j++ ){
		putcolor= this.data[j][x];		
		if(putcolor == -1 ) break;
		if(putcolor == color) {
			existX = i;
			existY = j;				
			break;
		}	 
	}
	if(existY >= 0) {
		for(j = y +1; j<existY ; j++ ){
			putcolor= this.data[j][x];
			if(putcolor != color) {
				this.data[j][x] = color;
				changedCount++;
			}
		}
	}
	
	//console.log('y++ : ' + changedCount);
	//y--
	existY = -1;	
	for( j = y-1  ; j  >=  0; j-- ){
	
		putcolor= this.data[j][x];
		if(putcolor == -1 ) break;
		if(putcolor == color) {
			existY = j;				
			break;
		}	 
	}
	if(existY >= 0) {
		for( j = y-1  ; j  >=  existY; j-- ){
			putcolor= this.data[j][x];
			if(putcolor != color) {
				this.data[j][x] = color;
				changedCount++;
			}
		}
	}
	//console.log('y-- : ' + changedCount);
	
	//x++ y++
	existX = -1;
	existY = -1;	
	for(j = y+1, i = x+1; j<8 || i<8 ;j++ , i++ ){		
		putcolor= this.data[j][i];		
		if(putcolor == -1 ) break;
		if(putcolor == color) {
			existX = i;
			existY = j;				
			break;
		}	 
	}
	if(existX >= 0 &&existY >= 0) {
		for(j = y+1, i = x+1; j< existY || i<existX ;j++ , i++ ){
			putcolor= this.data[j][i];
			if(putcolor != color) {
				this.data[j][i] = color;
				changedCount++;
			}
		}
	}
	//console.log('x++ y++ : ' + changedCount);
	//x++ y--
	existX = -1;
	existY = -1;	
	for(j = y-1, i = x+1; j >= 0 || i<8 ;j-- , i++ ){
				
		putcolor= this.data[j][i];
			
		if(putcolor == -1 ) break;
		if(putcolor == color) {
			existX = i;
			existY = j;				
			break;
		}	 
	}
	if(existX >= 0 &&existY >= 0) {
		for(j = y-1, i = x+1; j>= existY|| i<existX ;j-- , i++ ){
			putcolor= this.data[j][i];
			if(putcolor != color) {
				this.data[j][i] = color;
				changedCount++;
			}
		}
	}
	//console.log('x++ y-- : ' + changedCount);
	//x-- y++
	existX = -1;
	existY = -1;	
	for(j = y+1, i = x-1; j<8 || i>= 0 ;j++ , i-- ){		
		putcolor= this.data[j][i];		
		if(putcolor == -1 ) break;
		if(putcolor == color) {
			existX = i;
			existY = j;				
			break;
		}	 
	}
	if(existX >= 0 &&existY >= 0) {
		for(j = y+1, i = x-1; j<existY || i>= existX;j++ , i-- ){
			putcolor= this.data[j][i];
			if(putcolor != color) {
				this.data[j][i] = color;
				changedCount++;
			}
		}
	}
	//console.log('x-- y++ : ' + changedCount);
	//x-- y--
	existX = -1;
	existY = -1;	
	for(j = y-1, i = x-1; j>=0 || i>= 0 ;j-- , i-- ){		
		putcolor= this.data[j][i];		
		if(putcolor == -1 ) break;
		if(putcolor == color) {
			existX = i;
			existY = j;				
			break;
		}	 
	}
	if(existX >= 0 &&existY >= 0) {
		for(j = y-1, i = x-1; j>=existY|| i>= existX ;j-- , i-- ){
			putcolor= this.data[j][i];
			if(putcolor != color) {
				this.data[j][i] = color;
				changedCount++;
			}
		}
	}
	//console.log('x-- y-- : ' + changedCount);
	if(changedCount == 0 )return new Error('no changed unit');
	this.data[y][x] = color;
	return undefined;
}

module.exports = RoomDataInfo;

