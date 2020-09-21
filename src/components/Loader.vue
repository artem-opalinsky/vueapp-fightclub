<template>
    <div class="modal-mask">
      <div class="modal-container">
        <b-row class="justify-content-md-center">
            <p>Waiting for the second player...</p>
        </b-row>
        <b-row class="justify-content-md-center">
            <div class="lds-dual-ring"></div>
        </b-row>
      </div>
    </div>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 700px;
  height: 260px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-size: 2.5rem;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}

.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 7rem;
  height: 7rem;
  margin: 0rem;
  border-radius: 50%;
  border: 6px solid #cef;
  border-color: #cef transparent #cef transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>