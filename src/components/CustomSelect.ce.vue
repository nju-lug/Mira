<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';

const props = defineProps<{
  id: string;
  prompt?: string;
}>();

type Target = {
  name: string | null;
  value: string;
};

const targets = reactive([] as Target[]);
const boxRef = ref<HTMLDivElement | null>(null);
const onSelection = (value: string) => {
  const slot = boxRef.value?.querySelector('slot');
  slot?.setAttribute('name', value);
};

onMounted(() => {
  const selections = document.querySelectorAll(`#${props.id} > mira-option`);
  selections.forEach(choice => {
    const value = choice.getAttribute('slot');
    const name = choice.getAttribute('name');
    if (value != null) {
      targets.push({ name, value });
    }
  });
  onSelection(targets[0].value);
});
</script>

<template>
  <div ref="boxRef">
    <p>
      <label>{{ prompt }}</label>
      <select @change="e => onSelection((e.target as HTMLSelectElement).value)">
        <option v-for="{ name, value } in targets" :key="value" :value="value">
          {{ name ?? value }}
        </option>
      </select>
    </p>
    <!-- v-bind here doesn't make sense (why?) -->
    <slot />
  </div>
</template>
