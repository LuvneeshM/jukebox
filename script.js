function Song(song_name, artist, image, song_file){
	this.song_name = song_name,
	this.artist = artist,
	this.image = image,
	this.song_file = song_file
}

function Jukebox(songs_list){
	this.songs_list = songs_list
	this.current_song_index = 0 % this.songs_list.length
	this.current_song = this.songs_list[this.current_song_index]

	this.playSong = function(){
		this.current_song = this.songs_list[this.current_song_index]
		//play current song
		var playButton_src = document.getElementById("song")
		playButton_src.setAttribute("src", this.current_song.song_file)
		var playButton_audio = document.getElementById("play_audio")
		playButton_audio.load()
		playButton_audio.play()
		this.update()
	}

	this.pauseSong = function(){
		//pause current song
		var playButton_audio = document.getElementById("play_audio")
		playButton_audio.pause()
	}

	this.fastforward = function(){
		this.pauseSong()
		this.current_song_index = (this.current_song_index+1)%this.songs_list.length
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

	this.randomSong = function(){
		this.pauseSong()
		var next = Math.floor(Math.random() * this.songs_list.length)
		while(next == this.current_song_index){
			next = Math.floor(Math.random() * this.songs_list.length)
		}
		this.current_song_index = next
		this.playSong()
	}

	this.update = function() {
		for (var i = 0; i < this.songs_list.length; i++){
			var li = document.getElementById(i)
			if (i == this.current_song_index){
				li.setAttribute("class", "active")
			}
			else{
				li.setAttribute("class", "not_active")
			}
		}
		this.displayImage()
		this.displayTitle()
1	}

	this.displayImage = function(){
		var album_cover = document.getElementById("album_cover_img")
		album_cover.setAttribute("src", this.current_song.image)

		var next_song_index = (this.current_song_index+1)%this.songs_list.length
		var next_song = this.songs_list[next_song_index]
		var album_cover_next = document.getElementById("album_cover_img_next")
		album_cover_next.setAttribute("src", next_song.image)
	}

	this.displayTitle = function(){
		var music_title = document.getElementById("title")
		music_title.innerHTML = this.current_song.song_name + " by " + this.current_song.artist
	}

	this.update()

}

var s1 = new Song("In The End", "Linkin Park", "https://images.genius.com/9b3577380616e434444df78c3ee23272.1000x1000x1.jpg", "songs/LinkinParkInTheEnd.mp3")
var s2 = new Song("Legendary", "Markelody", "https://i.ytimg.com/vi/g4lDy9Hx-hQ/maxresdefault.jpg", "songs/numb.mp3")
var s3 = new Song("Sunflower", "Post Malone", "https://i.ytimg.com/vi/BN63QQmn3Ck/maxresdefault.jpg", "songs/sunflower.mp3")
var s4 = new Song("Best of Me", "Neffex", "https://images.genius.com/8a84319748898f78c4db680c0a394e31.1000x1000x1.jpg", "songs/bestofme.mp3")
var s5 = new Song("Burn The House Down", "AJR", "https://m.media-amazon.com/images/I/814SRbr1-UL._SS500_.jpg", "songs/burnhousedown.mp3")
var s6 = new Song("Radioactive", "Imagine Dragons", "https://f4.bcbits.com/img/a1907849484_10.jpg", "songs/radioactive.mp3")

var song_array = [s3, s1, s2, s4, s5, s6]

function Rewind(){
	jukebox_obj.rewind()
}
function Play(){
	jukebox_obj.playSong()
}
function Pause(){
	jukebox_obj.pauseSong()
}
function FF(){
	jukebox_obj.fastforward()
}
function randomSong(){
	jukebox_obj.randomSong()
}
function newSong(num){
	for (var i = 0; i < song_array.length; i++){
		var li = document.getElementById(i)
		if (i == num){
			li.setAttribute("class", "active")
			jukebox_obj.current_song_index = i
			Play()
		}
		else{
			li.setAttribute("class", "not_active")
		}
	}
}

var ul = document.getElementById("playlist")
for (var i = 0; i < song_array.length; i++){
	var li = document.createElement("li");
	li.setAttribute("id", i);
	li.setAttribute("onclick", "newSong(this.id)")
	li.innerHTML = song_array[i].song_name + " -- " + song_array[i].artist
	if (i == 0){
		li.setAttribute("class", "active")
	}
	else{
		li.setAttribute("class", "not_active")
	}
	ul.appendChild(li);
}

var jukebox_obj = new Jukebox(song_array)