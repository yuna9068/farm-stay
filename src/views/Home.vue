<template>
  <div class="home">
    <NavRegion/>
    <FormFilter/>
    <FarmList/>
    <ScrollButton/>
  </div>
</template>

<script>
import NavRegion from '@/components/NavRegion.vue';
import FormFilter from '@/components/FormFilter.vue';
import FarmList from '@/components/FarmList.vue';
import ScrollButton from '@/components/ScrollButton.vue';

export default {
  name: 'Home',
  components: {
    NavRegion,
    FormFilter,
    FarmList,
    ScrollButton,
  },
};
</script>

<style lang="scss" scoped>
.home {
  min-height: calc(100vh - 56px);
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
