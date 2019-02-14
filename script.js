function Song(song_name, artist, image, song_file){
	this.song_name = song_name,
	this.artist = artist,
	this.image = image,
	this.song_file = song_file
}

function Jukebox(songs_list){
	this.songs_list = songs_list
	this.current_song_index = 1 % this.songs_list.length
	this.current_song = this.songs_list[this.current_song_index]
	this.playSong = function(){
		this.current_song = this.songs_list[this.current_song_index]
		//play current song
		var playButton_src = document.getElementById("song")
		playButton_src.setAttribute("src", this.current_song.song_file)
		var playButton_audio = document.getElementById("play_audio")
		playButton_audio.load()
		playButton_audio.play()
		console.log("PLAYING WOOT")
	}

	this.pauseSong = function(){
		//pause current song
		var playButton_audio = document.getElementById("play_audio")
		playButton_audio.pause()
		console.log("PAUSING WOOT")
	}

	this.fastforward = function(){
		this.pauseSong()
		console.log("index before", this.current_song_index)
		this.current_song_index = (this.current_song_index+1)%this.songs_list.length
		console.log("index after", this.current_song_index)
		this.playSong()
	}

	this.rewind = function(){
		this.pauseSong()
		this.current_song_index = (this.current_song_index-1)%this.songs_list.length
		if (this.current_song_index == -1){
			this.current_song_index = this.songs_list.length - 1
		}
		this.playSong()
	}
}


/////////////////////////////////////

var s1 = new Song("In The End", "Linkin Park", "https://images.genius.com/9b3577380616e434444df78c3ee23272.1000x1000x1.jpg", "songs/LinkinParkInTheEnd.mp3")
var s2 = new Song("Numb", "Linkin Park", "https://images.genius.com/9b3577380616e434444df78c3ee23272.1000x1000x1.jpg", "songs/numb.mp3")

var song_array = [s1, s2]
var jukebox_obj = new Jukebox(song_array)

function Rewind(){
	jukebox_obj.rewind()
}
function play(){
	jukebox_obj.playSong()
}
function Pause(){
	jukebox_obj.pauseSong()
}
function FF(){
	jukebox_obj.fastforward()
}

document.getElementById("play_button").addEventListener("click", play);