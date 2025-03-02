<template>
  <div 
    class="greeting-container p-8 rounded-lg shadow-md mb-12 hover:shadow-lg transition-all duration-300 group cursor-pointer relative"
    @click="setRandomGreeting"
    @mousemove="updateTooltipPosition"
    @mouseenter="showTooltip = true"
    @mouseleave="showTooltip = false"
  >
    <h3 class="greeting-text text-xl font-medium mb-4 text-gray-800 dark:text-gray-200 transition-colors">{{ greeting }}! Thank you for visiting!</h3>
    <div 
      v-if="showTooltip" 
      class="tooltip absolute px-2 py-1 bg-gray-800 text-white text-sm rounded-md shadow-lg pointer-events-none z-10 transition-opacity duration-200"
      :style="{ left: tooltipX + 'px', top: tooltipY + 'px', transform: 'translate(0, 0)' }"
    >
      Click me to change greeting!
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    messages: {
      type: Array,
      required: true,
      default: () => ["Hello", "Hi", "Hey"]
    }
  },
  setup(props) {
    const randomMessage = () => {
      return props.messages[Math.floor(Math.random() * props.messages.length)];
    };

    const greeting = ref(props.messages[0]);
    const showTooltip = ref(false);
    const tooltipX = ref(0);
    const tooltipY = ref(0);

    const setRandomGreeting = () => {
      // If there's only one message, there's nothing to change
      if (props.messages.length <= 1) return;
      
      // Find a different greeting than the current one
      let newGreeting;
      do {
        newGreeting = randomMessage();
      } while (newGreeting === greeting.value);
      
      greeting.value = newGreeting;
    };

    const updateTooltipPosition = (event) => {
      // Use clientX/clientY for consistent positioning
      const rect = event.currentTarget.getBoundingClientRect();
      tooltipX.value = event.clientX - rect.left; // Directly at cursor X position
      tooltipY.value = event.clientY - rect.top - 30; // 30px above cursor (tooltip height + margin)
    };

    return {
      greeting,
      setRandomGreeting,
      showTooltip,
      tooltipX,
      tooltipY,
      updateTooltipPosition
    };
  }
};
</script>

<style scoped>
.greeting-container {
  background: linear-gradient(137deg, #B7B1F2, #FDB7EA, #FFDCCC, #FBF3B9, #87A2FF, #C4D7FF, #FFD7C4, #FFF4B5);
  background-size: 800% 800%;
  animation: GradientFlow 15s ease infinite;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.tooltip {
  opacity: 0.9;
  white-space: nowrap;
  pointer-events: none;
  filter: drop-shadow(0 1px 2px rgba(0,0,0,0.2));
  transform: translateX(-50%); /* Center the tooltip horizontally relative to cursor */
}

.dark .greeting-container {
  background: linear-gradient(317deg, #8780C0, #CA86B8, #CCAB9A, #C8C187, #657ACB, #92A5CC, #CCA692, #CCC283);
  background-size: 800% 800%;
  animation: GradientFlow 15s ease infinite;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.greeting-text {
  color: #2D3748;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.dark .greeting-text {
  color: #E2E8F0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.greeting-container:hover .greeting-text {
  color: #C5BAFF;
  text-shadow: 0 0 8px rgba(197, 186, 255, 0.6), 0 0 12px rgba(196, 217, 255, 0.4);
}

.dark .greeting-container:hover .greeting-text {
  color: #E8F9FF;
  text-shadow: 0 0 8px rgba(232, 249, 255, 0.6), 0 0 12px rgba(196, 217, 255, 0.4);
}

@keyframes GradientFlow {
  0% {
    background-position: 0% 50%;
  }
  25% {
    background-position: 50% 100%;
  }
  50% {
    background-position: 100% 25%;
  }
  75% {
    background-position: 75% 0%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>