const songList = [
  {
    title: 'No Chances',
    group: 'Twenty One Pilots',
    file: 'No-Chances.mp3',
    cover: 'Scaled-And-Icy.jpg',
  },
  {
    title: 'Shot Me Down',
    group: 'David Guetta',
    file: 'Shot-Me-Down.mp3',
    cover: 'David-Guetta.jpg',
  },
  {
    title: "Won't Stand Down",
    group: 'Muse',
    file: 'Wont-Stand-Down.mp3',
    cover: 'Wont-Stand-Down.jpg',
  },
]

let currentSong = null
const $ = (param) => document.getElementById(param)

const songs = $('songs')
const audio = $('audio')
const cover = $('cover')
const title = $('title')
const group = $('group')
const play = $('Play')
const nextSong = $('NextSong')
const prevSong = $('PrevSong')
const progress = $('progress')
const progressContainer = $('progressContainer')

audio.addEventListener('timeupdate', updateProgress)

audio.addEventListener('ended', () =>
  currentSong < songList.length - 1 ? loadSong(currentSong + 1) : loadSong(0)
)

prevSong.addEventListener('click', () =>
  currentSong > 0 ? loadSong(currentSong - 1) : loadSong(songList.length - 1)
)

nextSong.addEventListener('click', () =>
  currentSong < songList.length - 1 ? loadSong(currentSong + 1) : loadSong(0)
)

function loadSongs() {
  songList.forEach((song, index) => {
    const li = document.createElement('li')
    li.textContent = `${song.group} | ${song.title}`
    li.addEventListener('click', () => loadSong(index))
    // Add "li" to "ul"
    songs.appendChild(li)
  })
}

function loadSong(songIndex) {
  if (songIndex !== currentSong) {
    changeActiveSong(currentSong, songIndex)
    currentSong = songIndex
    title.innerText = songList[songIndex].title
    group.innerText = songList[songIndex].group
    cover.src = `./images/${songList[songIndex].cover}`
    audio.src = `./audio/${songList[songIndex].file}`
    play.src = './images/pause.png'
    updateUI(true)
    audio.play()
  }
}

function updateProgress(event) {
  const { duration, currentTime } = event.srcElement
  const percent = (currentTime / duration) * 100
  progress.style.width = `${percent}%`
  progressContainer.addEventListener('click', (eventProgress) => {
    // const totalWidth = eventProgress.srcElement.offsetWidth
    const totalWidth = 160 // 10rem = 160px
    const progressWidth = eventProgress.offsetX
    const marker = (progressWidth / totalWidth) * audio.duration
    audio.currentTime = marker
  })
}

function changeActiveSong(lastIndex, newIndex) {
  const links = document.querySelectorAll('li')
  if (lastIndex !== null) {
    links[lastIndex].classList.remove('active')
  }
  links[newIndex].classList.add('active')
}

function updateUI(audioState) {
  play.addEventListener('click', () => {
    audioState = !audioState
    if (audioState === true) {
      play.src = './images/pause.png'
      audio.play()
    } else {
      play.src = './images/play.png'
      audio.pause()
    }
  })
}

loadSongs()
