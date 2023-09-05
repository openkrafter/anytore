<template>
  <div>
    <button class="my-btn">
      <slot />
    </button>
    <img src="../../assets/icon-plus.svg" height="10" />
  </div>
</template>

<style>
.my-btn {
  color: #fff;
  background-color: #333;
  margin-left: 0.5em;
  border-radius: 0.5em;
}
</style>
