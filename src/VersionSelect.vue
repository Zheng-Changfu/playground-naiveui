<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Copy from './icons/Copy.vue'

const props = defineProps<{
  pkg: string
  label: string
}>()
const expanded = ref(false)
const versions = ref<string[]>()

const version = defineModel()
async function toggle() {
  expanded.value = !expanded.value
  if (!versions.value) {
    versions.value = await fetchVersions()
  }
}

async function fetchVersions(): Promise<string[]> {
  const res = await fetch(
    `https://data.jsdelivr.com/v1/package/npm/${props.pkg}`,
  )
  const { versions } = (await res.json()) as { versions: string[] }

  if (props.pkg === 'vue') {
    // if the latest version is a pre-release, list all current pre-releases
    // otherwise filter out pre-releases
    let isInPreRelease = versions[0].includes('-')
    const filteredVersions: string[] = []
    for (const v of versions) {
      if (v.includes('-')) {
        if (isInPreRelease) {
          filteredVersions.push(v)
        }
      }
      else {
        filteredVersions.push(v)
        isInPreRelease = false
      }
      if (filteredVersions.length >= 30 || v === '3.0.10') {
        break
      }
    }
    return filteredVersions
  }
  else if (props.pkg === 'typescript') {
    return versions.filter(v => !v.includes('dev') && !v.includes('insiders'))
  }
  return versions
}

function setVersion(v: string) {
  version.value = v
  expanded.value = false
}

function copyVersion(v: string) {
  window.navigator.clipboard.writeText(v).then(() => {
    // eslint-disable-next-line no-alert
    alert('Vue version has been copied to clipboard.')
  })
}

onMounted(() => {
  window.addEventListener('click', () => {
    expanded.value = false
  })
  window.addEventListener('blur', () => {
    if (document.activeElement?.tagName === 'IFRAME') {
      expanded.value = false
    }
  })
})
</script>

<template>
  <div class="version" @click.stop>
    <span class="active-version" @click="toggle">
      {{ label }}
      <span class="number">{{ version }}</span>
    </span>

    <ul class="versions" :class="{ expanded }">
      <li v-if="!versions">
        <a>loading versions...</a>
      </li>
      <li v-for="(ver, index) of versions" :key="index" class="versions-item" :class="{
        active: ver === version || (version === 'latest' && index === 0),
      }">
        <a @click="setVersion(ver)">v{{ ver }}</a>
        <button title="Copy Version" class="version-copy" @click="copyVersion(`v${ver}`)">
          <Copy />
        </button>
      </li>
      <div @click="expanded = false">
        <slot />
      </div>
    </ul>
  </div>
</template>

<style>
.version {
  margin-right: 12px;
  position: relative;
}

.active-version {
  cursor: pointer;
  position: relative;
  display: inline-flex;
  place-items: center;
}

.active-version .number {
  color: var(--green);
  margin-left: 4px;
}

.active-version::after {
  content: '';
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 6px solid #aaa;
  margin-left: 8px;
}

.versions .active a {
  color: var(--green);
}

.versions .versions-item {
  display: flex;
  justify-content: space-between;
}

.versions .versions-item .version-copy {
  display: none;
}

.versions .versions-item:hover .version-copy {
  display: block;
}
</style>
