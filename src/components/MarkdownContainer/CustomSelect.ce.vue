<script setup lang="ts">
import { reactive, onMounted } from 'vue';

import { useElementRef } from '@/hooks';

const props = defineProps<{
  id: string;
  prompt?: string;
}>();

interface SlotTarget {
  name: string | null;
  value: string;
}

const targets = reactive([] as SlotTarget[]);
const boxRef = useElementRef<HTMLElement>();

const selectSlot = (slotName: string) => {
  const slot = boxRef.value?.querySelector('slot');
  slot?.setAttribute('name', slotName);
};

const onSelect = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  selectSlot(target.value);
};

onMounted(() => {
  document.querySelectorAll(`#${props.id} > mira-option`).forEach(choice => {
    const value = choice.getAttribute('slot');
    if (value != null) {
      targets.push({ name: choice.getAttribute('name'), value });
    }
  });
  selectSlot(targets[0].value);
});
</script>

<template>
  <div ref="boxRef">
    <p>
      <label v-if="prompt">{{ prompt }}</label>
      <select @change="onSelect">
        <option v-for="{ name, value } in targets" :key="value" :value="value">
          {{ name ?? value }}
        </option>
      </select>
    </p>
    <!-- v-bind here doesn't make sense (why?) -->
    <slot />
  </div>
</template>
