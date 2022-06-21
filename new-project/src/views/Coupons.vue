<template>
  <Loading :active="isLoading"></Loading>
  <div>
    <div class="d-flex justify-content-end">
      <button
        class="btn btn-primary mx-5"
        type="button"
        @click="openModal(true)"
      >
        新增文章
      </button>
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col" width="300">優惠券名稱</th>
          <th scope="col" width="300">折扣</th>
          <th scope="col" width="300">到期日</th>
          <th scope="col">剩餘數量</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr v-for="item in coupons" :key="item.id">
          <td>{{item.title}}</td>
          <td>{{ item.percent }}</td>
          <td>{{ date(item.due_date) }}</td>
          <td>
            {{ item.is_enabled }}
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-secondary btn-sm"
                @click="openModal(false, item)"
              >
                <i class="bi bi-pencil-square"></i>

                編輯
              </button>
              <button class="btn btn-danger btn-sm" @click="openDelModal(item)">
                <i class="bi bi-trash3-fill"></i>
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :pages="paginations" @emit-pages="getCoupons"></pagination>
    <couponModal ref="couponModal" :coupon="tempCoupon" @update-coupon="updateCoupon"></couponModal>
      <delModal
      ref="delModal"
      :item="tempCoupon"
      @del-item="delCoupon"
    ></delModal>
  </div>
</template>
<script>
import {date} from "../methods/filters"
import pagination from "../components/Pagination.vue"
import couponModal from "../components/CouponModal.vue"
import delModal from "../components/DelModal.vue"

export default {
    data(){
        return{
            isNew:false,
            isLoading:false,
            paginations: {},
            coupons:[],
            tempCoupon:{},
        };
    },
    components:{
        pagination,
        couponModal,
        delModal,
    },
    inject: ["emitter"],
    methods: {
       date,
        getCoupons(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons/?page=${page}`;
      this.isLoading = true;
      console.log(this.isLoading, "loading");
      this.$http.get(api).then((res) => {
        console.log("res", res);
        this.isLoading = false;
        console.log(this.isLoading, "loading");
        if (res.data.success) {
          console.log("article", res.data);
          this.coupons = res.data.coupons;
          this.pagination = res.data.pagination;
        }
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempCoupon = {};
      } else {
        this.tempCoupon = { ...item };
      }
      this.isNew = isNew;
      console.log(isNew, item);
      const couponComponent = this.$refs.couponModal;
      couponComponent.showModal();
    },
    openDelModal(item) {
      // v-for 傳 item 進來到
      this.tempCoupon = { ...item };
      console.log(this.tempCoupon, "item");
      const delComponent = this.$refs.delModal;
      delComponent.showModal();
    },
    delCoupon() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
      this.$http.delete(url).then((response) => {
        console.log(response.data);
        const delComponent = this.$refs.delModal;
        delComponent.hideModal();
        this.getCoupons();
      });
    },
     updateCoupon(item) {
      this.tempCoupon = item;
      // 新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
      const couponComponent = this.$refs.couponModal;
      let httpMethod = "post"; //如果是新產品就用post

      // 編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`;
        httpMethod = "put";
      }
      //axios 搭配變數使用方法
      this.$http[httpMethod](api, { data: this.tempCoupon }).then((res) => {
        console.log(res);
        couponComponent.hideModal();
        if (res.data.success) {
          this.getCoupons();
          this.emitter.emit("push-message", {
            style: "success",
            title: "更新成功",
          });
        } else {
          this.emitter.emit("push-message", {
            style: "danger",
            title: "更新失敗",
            content: res.data.message.join("、"),
          });
        }
      });
    },
   },
   created() {
     this.getCoupons();
   },
}
</script>