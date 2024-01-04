<template>
  <div>
    <PostList>
      <PostItem v-for="post in posts" :post="post" :key="post.id"/>
    </PostList>
    <PostDetails v-if="showPostDetails" />
    <PostUpload v-if="showPostUpload" />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import useMainStore from '../stores/main';
import usePostStore from '../stores/post';
import PostList from '../components/PostList.vue';
import PostItem from '../components/PostItem.vue';
import PostUpload from '../components/PostUpload.vue';
import PostDetails from '../components/PostDetails.vue';

const store = useMainStore();
const postStore = usePostStore();
const showPostUpload = computed(() => store.showPostUpload);
const showPostDetails = computed(() => store.showPostDetails);
const posts = computed(() => postStore.list);

onMounted(() => {
  postStore.loadAllPosts();
});
</script>
<style scoped></style>
