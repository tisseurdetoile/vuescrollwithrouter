<template>
  <w-app>
    <MenuPoint
      @change-route="scrollToRoute"
      :active="activeRoute"
      :length="listScrollableRoute.length"
    />
    <router-view v-slot="{ Component }">
      <transition name="scale-slide">
        <component :is="Component" />
      </transition>
    </router-view>
  </w-app>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import MenuPoint from '@/components/MenuPoint'

export default {
  name: 'Home',
  components: { MenuPoint },
  data: function() {
    return {
      inMove: false,
      touchStartY: 0,
      scale: 1,
      listScrollableRoute: [],
    }
  },
  methods: {
    handleWheelListener: function(e) {
      //let curentScale = this.scale
      //this.scale += e.deltaY * -0.01
      //let delta = curentScale - this.scale

      if (!this.inMove) {
        //if (delta > 0) {
        if (e.deltaY < 0) {
          this.moveDown()
        }
        //if (delta < 0) {
        if (e.deltaY > 0) {
          this.moveUp()
        }
      }
    },

    handleMouseWheel: function(e) {
      /* eslint-disable no-console */
      console.log('handleMouseWheel', e.wheelDelta)
      /* eslint-enable no-console */

      if (!this.inMove) {
        if (e.wheelDelta < 0) {
          this.moveUp()
        }
        if (e.wheelDelta > 0) {
          this.moveDown()
        }
      }

      e.preventDefault()
      return false
    },
    handleMouseWheelDOM: function(e) {
      /* eslint-disable no-console */
      console.log('handleMouseWheelDOM')
      /* eslint-enable no-console */

      if (!this.inMove) {
        if (e.detail > 0) {
          this.moveUp()
        }
        if (e.detail < 0) {
          this.moveDown()
        }
      }

      return false
    },
    touchStart(e) {
      /* eslint-disable no-console */
      console.log('touchStart')
      /* eslint-enable no-console */
      e.preventDefault()

      this.touchStartY = e.touches[0].clientY
    },
    touchMove(e) {
      /* eslint-disable no-console */
      console.log('touchMove')
      /* eslint-enable no-console */
      if (this.inMove) {
        return false
      }
      e.preventDefault()

      const currentY = e.touches[0].clientY

      if (this.touchStartY < currentY) {
        this.moveUp()
      } else {
        this.moveDown()
      }

      this.touchStartY = 0
      return false
    },
    moveDown() {
      this.inMove = true
      let newRoute = this.activeRoute
      newRoute--

      if (newRoute < 0) {
        newRoute = 0
      }

      this.scrollToRoute('down', newRoute)
    },
    moveUp() {
      this.inMove = true
      let newRoute = this.activeRoute
      newRoute++
      if (newRoute === -1 || newRoute > this.listScrollableRoute.length - 1) {
        newRoute = 0
      }
      this.scrollToRoute('up', newRoute)
    },

    scrollToRoute(direction, id) {
      this.$router.push(this.listScrollableRoute[id])

      setTimeout(() => {
        this.inMove = false
      }, 800)
    },

    fetchScrollableRoute() {
      const router = useRouter()
      this.listScrollableRoute = router
        .getRoutes()
        .filter((route) => route.meta.scrollable)
    },
  },
  setup() {
    const route = useRoute()

    return { route }
  },

  computed: {
    activeRouteName: function() {
      return this.route.name
    },
    activeRoute: function() {
      return this.listScrollableRoute.findIndex(
        (route) => route.name === this.route.name
      )
    },
  },

  created() {
    this.fetchScrollableRoute()
    window.addEventListener('touchstart', this.touchstart, {
      passive: false,
    }) // mobile devices
    window.addEventListener('touchmove', this.touchMove, {
      passive: false,
    }) // mobile devices

    window.addEventListener('wheel', this.handleWheelListener)
  },
  unmounted() {
    window.removeEventListener('touchstart', this.touchStart) // mobile devices
    window.removeEventListener('touchmove', this.touchMove) // mobile devices

    window.removeEventListener('wheel', this.handleWheelListener)
  },
}
</script>

<style lang="scss">
* {
  color: #fff;
  margin: 0;
  padding: 0;
}
section {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

h1 {
  font-size: 6em;
  margin: 0;
  text-align: center;
  padding: 0 1rem;
}

h2 {
  font-size: 4em;
  margin: 0;
  text-align: center;
  padding: 0 1rem;
}

p {
  font-size: 1em;
}

p.badge a {
  text-decoration: none;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.3);
  padding: 5px 10px;
  color: #fff;
}

/** transition */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-slide-enter-active,
.scale-slide-leave-active {
  position: absolute;
  transition: all 0.85s ease;
}

.scale-slide-enter-from {
  bottom: -100%;
}

.scale-slide-enter-to {
  bottom: 0%;
}

.scale-slide-leave-from {
  transform: scale(1);
}

.scale-slide-leave-to {
  transform: scale(1);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

@media screen and (max-width: 500px) {
  h1 {
    font-size: 2em;
    margin: 0;
    text-align: center;
    padding: 0 0.3rem;
  }

  h2 {
    font-size: 1.5em;
    margin: 0;
    text-align: center;
    padding: 0.2rem;
  }
}
</style>
