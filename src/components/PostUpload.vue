<template>
  <TheModal @close="store.changeShowPostUpload(false)">
    <div class="postUpload">
      <label class="upload">
        <img v-if="imageObjUrl" :src="imageObjUrl" class="preview" />
        <div v-else>上傳圖片</div>
        <input
          type="file"
          accept="image/*"
          class="fileChooser"
          @change="handleImageUpload"
        />
      </label>
      <div class="postContent">
        <textarea
          placeholder="寫點什麼吧..."
          class="postContentInput"
          v-model="description"
        ></textarea>
        <TheButton class="pubBtn" @click="publishPost"
          >發文</TheButton
        >
      </div>
    </div>
  </TheModal>
</template>
<script setup>
import { ref } from 'vue';
import useMainStore from '../stores/main';
import usePostStore from '../stores/post';
import TheModal from './TheModal.vue';
import TheButton from './TheButton.vue';

const store = useMainStore();
const postStore = usePostStore();
const imageObjUrl = ref('');

const image = ref(null);
const description = ref('');

/**
 * @method 上傳圖片
 * @param {string} image 圖片檔
 * @return void
 */
async function handleImageUpload(e) {
  const imageFile = e.target.files[0];
  if (imageFile) {
    // 預覽
    imageObjUrl.value = URL.createObjectURL(imageFile);
    image.value = imageFile;
  }
}

/**
 * @method 發布功能
 * @return void
 */
function publishPost() {
  postStore.uploadPost({ image: image.value, description: description.value });
}
</script>
<style scoped>
.postUpload {
  width: 50vw;
  height: 70vh;
  display: grid;
  grid-template-rows: 4fr 1fr;
}

.preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 0;
}
.upload {
  display: grid;
  place-items: center;
  cursor: pointer;
  min-height: 0;
}
.upload > svg {
  width: 254px;
  height: 316px;
}

.fileChooser {
  opacity: 0;
  position: absolute;
}

.postContent {
  display: grid;
}
.postContentInput {
  border-bottom: none;
  resize: none;
  padding: 12px 24px;
}

.postContentInput::placeholder {
  color: #757575;
}

.pubBtn {
  align-self: end;
  justify-self: end;
  position: relative;
  right: 24px;
  bottom: 18px;
}
</style>
