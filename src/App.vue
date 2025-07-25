<script setup lang="ts">
import type { SFCOptions, StoreState } from "@vue/repl";
import { Repl, mergeImportMap, useStore, useVueImportMap, File } from "@vue/repl";
import Monaco from "@vue/repl/monaco-editor";
import { computed, onMounted, ref, watchEffect } from "vue";
import Header from "./Header.vue";
import Welcome from "./template/welcome.vue?raw";
import Demo from "./template/Demo.vue?raw";

const previewOptions = {
  headHTML: `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.css" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/@unocss/runtime"><\/script>
    <script>
      window.__unocss = {
        rules: [],
        presets: [],
      }
    <\/script>
  `,
  customCode: {
    importCode: `import { initCustomFormatter } from 'vue'
    import naive from 'naive-ui'
    `,
    useCode: `if (window.devtoolsFormatters) {
    const index = window.devtoolsFormatters.findIndex((v) => v.__vue_custom_formatter)
    window.devtoolsFormatters.splice(index, 1)
    initCustomFormatter()
  } else {
    initCustomFormatter()
  }
  app.use(naive) 
  `,
  },
};

const naiveUiVersion = ref();
const {
  vueVersion,
  importMap: baseImportMap,
  productionMode,
} = useVueImportMap();

const replRef = ref<InstanceType<typeof Repl>>();

function setVH() {
  document.documentElement.style.setProperty("--vh", `${window.innerHeight}px`);
}
window.addEventListener("resize", setVH);
setVH();

const useSSRMode = ref(false);

const AUTO_SAVE_STORAGE_KEY = "vue-sfc-playground-auto-save";
const initAutoSave: boolean = JSON.parse(
  localStorage.getItem(AUTO_SAVE_STORAGE_KEY) ?? "true"
);
const autoSave = ref(initAutoSave);

const mergedImportMap = computed(() => {
  const customImportMap = {
    imports: {
      "naive-ui":
        (!naiveUiVersion.value &&
          `https://unpkg.com/naive-ui/dist/index${productionMode.value ? ".prod.mjs" : ".mjs"
          }`) ||
        `https://unpkg.com/naive-ui@${naiveUiVersion.value}/dist/index${productionMode.value ? ".prod.mjs" : ".mjs"
        }`,
      "date-fns": `https://cdn.jsdelivr.net/npm/date-fns@3.6.0/index${productionMode.value ? ".min.mjs" : '.mjs'}`,
      "seemly": "/seemly.prod.mjs",
      "@vicons/ionicons4": "/vicons/ionicons4.prod.mjs",
      "@vicons/ionicons5": "/vicons/ionicons5.prod.mjs",
      "@vicons/fluent/Flash16Regular": "/vicons/flash16Regular.prod.mjs",
      "@vicons/fluent/Checkmark16Filled": "/vicons/checkmark16Filled.prod.mjs",
      "@vicons/fluent/AnimalCat24Regular": "/vicons/animalCat24Regular.prod.mjs",
      "@vicons/fluent/Temperature16Regular": "/vicons/temperature16Regular.prod.mjs",
      "@vicons/fluent/FlashCheckmark16Regular": "/vicons/flashCheckmark16Regular.prod.mjs",
      "katex": "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.mjs",
      "@lylajs/web":"/lylajs-web.prod.mjs",
      "grapheme-splitter":"/grapheme-splitter.prod.mjs",
    },
  };
  return mergeImportMap(baseImportMap.value, customImportMap);
});

let hash = location.hash.slice(1);
if (hash.startsWith("__DEV__")) {
  hash = hash.slice(7);
  productionMode.value = false;
}
if (hash.startsWith("__PROD__")) {
  hash = hash.slice(8);
  productionMode.value = true;
}
if (hash.startsWith("__SSR__")) {
  hash = hash.slice(7);
  useSSRMode.value = true;
}

// enable experimental features
const sfcOptions = computed(
  (): SFCOptions => ({
    script: {
      inlineTemplate: productionMode.value,
      isProd: productionMode.value,
      propsDestructure: true,
    },
    style: {
      isProd: productionMode.value,
    },
    template: {
      isProd: productionMode.value,
      compilerOptions: {
        isCustomElement: (tag: string) =>
          tag === "mjx-container" || tag.startsWith("custom-"),
      },
    },
  })
);

const store = useStore(
  {
    builtinImportMap: mergedImportMap as any as StoreState["builtinImportMap"],
    vueVersion,
    sfcOptions,
    ...(
      hash
        ? {}
        : {
          files: ref({
            "src/App.vue": new File('src/App.vue', Welcome),
            "src/Demo.vue": new File('src/Demo.vue', Demo),
          }),
          template: ref({
            welcomeSFC: Welcome,
          }),
        }
    )
  },
  hash
);

// persist state
watchEffect(() => {
  const newHash = store
    .serialize()
    .replace(/^#/, useSSRMode.value ? `#__SSR__` : `#`)
    .replace(/^#/, productionMode.value ? `#__PROD__` : `#`);
  history.replaceState({}, "", newHash);
});

function toggleSSR() {
  useSSRMode.value = !useSSRMode.value;
}

function toggleAutoSave() {
  autoSave.value = !autoSave.value;
  localStorage.setItem(AUTO_SAVE_STORAGE_KEY, String(autoSave.value));
}

function reloadPage() {
  replRef.value?.reload();
}

function toggleProdMode() {
  productionMode.value = !productionMode.value;
}

const theme = ref<"dark" | "light">("dark");
function toggleTheme(isDark: boolean) {
  theme.value = isDark ? "dark" : "light";
}
onMounted(() => {
  const cls = document.documentElement.classList;
  toggleTheme(cls.contains("dark"));
});
</script>

<template>
  <Header :store="store" :prod="productionMode" :ssr="useSSRMode" :autoSave="autoSave" @toggle-ssr="toggleSSR"
    @reload-page="reloadPage" @toggle-prod="toggleProdMode" @toggle-theme="toggleTheme"
    @toggle-autosave="toggleAutoSave" @toggle-naive-ui-version="(version: string) => naiveUiVersion = version" />
  <Repl ref="replRef" :store="store" :theme="theme" :editor="Monaco" :ssr="useSSRMode" :auto-resize="true"
    :clear-console="false" :model-value="autoSave" :show-compile-output="true" :preview-options="previewOptions"
    :editorOptions="{ autoSaveText: false }" @keydown.ctrl.s.prevent @keydown.meta.s.prevent />
</template>

<style>
.dark {
  color-scheme: dark;
}

body {
  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  margin: 0;
  --base: #444;
  --nav-height: 50px;
}

.vue-repl {
  height: calc(var(--vh) - var(--nav-height)) !important;
}

button {
  border: none;
  outline: none;
  cursor: pointer;
  margin: 0;
  background-color: transparent;
}
</style>
