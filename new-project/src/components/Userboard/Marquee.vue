<template>
  <div class="container-fluid main">
    <h4 class="text-center text-light text-shadow">Brands in NEED</h4>
    <div class="logo-wall">
      <div class="logo-wrapper first">
        <div class="logo card"><img src="https://media.licdn.cn/dms/image/C4D0BAQHQy8PG_ySLeA/company-logo_200_200/0/1624874210606?e=2159024400&v=beta&t=rTh9L51-bX69ZYRAry5vKDovuP_vidZGM5HRofbJxek" class="img-fluid"></div>
        <div class="logo card"><img src="https://leafly-public.s3-us-west-2.amazonaws.com/brands/logos/MKt7xRkFR8eGUhf5gEHx_BATCH%20horz%20500%20square-01.jpg" class="img-fluid"></div>
        <div class="logo card"><img src="https://www.snq.com.tw/data/cht/20131119/20131119ASBHGX.jpg" class="img-fluid"></div>
        <div class="logo card"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTVvQYvZbmZ3PnyY5lN7BoWTWC9TN-f7L9bgi8OlM_PBFW_YbVIzBywxD-Q7jZlBybdQ&usqp=CAU" class="img-fluid"></div>
        <div class="logo card"><img src="https://iconape.com/wp-content/png_logo_vector/innisfree-logo.png" class="img-fluid" width="150px"></div>
        <div class="logo card"><img src="https://kao-h.assetsadobe3.com/is/image/content/dam/sites/kao/web-kao-com/tw/curel/toppage/tw_global_logo.png?fmt=png-alpha&wid=336" class="img-fluid"></div>
        <div class="logo card"><span>尚未進駐</span></div>
      </div>
      <div class="logo-wrapper second">
        <div class="logo card"><span></span></div>
        <div class="logo card"><img src="https://www.za-cosmetics.tw/about_za_files/logo7.png" class="img-fluid" width="100px"></div>
        <div class="logo card"><img src="https://logos-download.com/wp-content/uploads/2018/07/Nivea_logo_black-700x700.png" class="img-fluid" width="150px"></div>
        <div class="logo card"><span>尚未進駐</span></div>
        <div class="logo card"><span>尚未進駐</span></div>
        <div class="logo card"><span>尚未進駐</span></div>
        <div class="logo card"><span>尚未進駐</span></div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.text-shadow{
      text-shadow:2px 2px 5px #0D0D0D;

}
.card{
  box-shadow: 2px 3px 5px rgba(0,0,0,0.5);
  border: 1px black solid;
  overflow: hidden;
}
h4{
  font-weight: 900;
}
.main {
  padding: 100px 0px;
  margin: 100px 0 0 0;
  // background: url(https://images.unsplash.com/photo-1521449256184-170b4a4c437c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80);
  // background-size: 100%;
  // background-position: center;
}
@keyframes scroll {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
}

@keyframes scroll2 {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-200%);
  }
}

.logo-wall {
  margin-top:100px ;
  display: flex;
  overflow: hidden;
  .logo-wrapper {
    display: flex;
    animation: scroll 40s linear infinite;
    &:nth-child(2) {
      animation: scroll2 40s linear infinite;
      animation-delay: -20s;
    }
    &.first > .logo:first-child {
    }
    &.second > .logo:first-child {
      background: red;
    }
    .logo {
      width: 250px;
      height: 250px;
      margin: 0 10px;
      padding:30px;
      border-radius: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
<script>
export default {};
</script>