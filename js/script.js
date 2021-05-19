const app = new Vue({
  el: '#banksy',
  data() {
    return {
      shredding: null,
      dropping: null
    }
  },
  methods: {
    shred() {
      this.shredding = anime({
        targets: '#original',
        height: 0,
        duration: 10000,
        delay: 0,
        autoplay: false,
        easing: 'linear'
      })

      this.dropping = anime({
        targets: '#painting',
        translateY: '101%',
        duration: 10000,
        delay: 0,
        autoplay: false,
        easing: 'linear'
      })
    },
    nextPage() { 
     setTimeout(() => document.getElementById('nextpage').innerHTML = `<div id="frame" onclick="transitionToPage('index2.html')">`, 9500);
	},
	
    artSelected(e) {
      this.shredding.play()
      this.dropping.play()
      
      loadImage(
        e.target.files[0],
        canvas => {
          let url = canvas.toDataURL('image/jpeg')
          
          document.getElementById('original').style.backgroundImage = `url(${url})`
          
          let elements = Array.from(document.getElementsByClassName('shred'))
          
          elements.forEach(element => {
            element.style.backgroundImage = `url(${url})`
          })
          
          document.getElementById('original').style.height    = '100%'
          document.getElementById('painting').style.transform = 'translateY(0)'
          
          this.shred()
        }, {
          canvas: true,
          crop: true,
          maxHeight: 566,
          maxWidth: 392,
          orientation: true
        }
      )
    }
  },
  mounted() {
    this.shred()
  }
})

