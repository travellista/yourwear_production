<template>
  <div class="wrapper">
  <div class="container">
    <div class="top"     :style="{backgroundImage: 'url('+require('../../../assets/'+code+'_'+colorname+'.jpg')+')'}"
 @click="getprouductdetail"
></div>
    <div class="bottom">
      <div class="left">
        <div class="details">
          <h5>{{name}}</h5>
          <div class="prices">
          <span v-show="discount > 0">{{pricebef}} </span>
          <span >{{priceafter}} </span>
          </div>
        </div>
        <div class="buy"             @click="addtocart"
>
            <b-icon-cart-plus class="material-icons" :scale="3" :shift-v="-35"
            
            ></b-icon-cart-plus>

            </div>
      </div>
      <div class="right">
        <!-- <div class="done">
            <i class="material-icons">done</i>
            </div> -->
        <div class="details">
          <h1>Chair</h1>
          <p>Added to your cart</p>
        </div>
        <!-- <div class="remove">
            <i class="material-icons">clear</i>
            </div> -->
      </div>
    </div>
  </div>
  <div class="inside">

    <div class="icon">
      
        <i class="material-icons">{{discount}}%</i>
        </div>
    <div class="contents">
      <table>
        <tr>
          <th>{{description}}</th>

        </tr>
      </table>
    </div>
  </div>
  
</div>
</template>

<script>
export default {
  components:{

  },
props:{
    code:{
        String
    },
    name:{
        String
    },
    
    colorname:{
        String
    },
    description:{
        String
    },
    pricebef:{
        String
    },
    priceafter:{
        String
    },
    discount:{
        String
    },
    colorid:{
        String
    },
    
},
methods:{
  getprouductdetail(){
    
    this.$store.dispatch('Get_product_details',{id:this.code,color_id:this.colorid}).then(
      
            this.$router.push({name:'productdetail'})

    )
  },
   addtocart(){
var product={colorid:this.colorid,code:this.code}
console.log('ok')
   this.$emit('getsizes',product)}
  
}
}
</script>

<style lang="scss" scoped>

html, body{
  background: #E3E3D8;
  font-family: sans-serif;
  padding: 25px;
}

.wrapper{
  width: 300px;
  height: 500px;
  background: white;
  margin: auto;
  position: relative;
  overflow: hidden;
  border-radius: 10px 10px 10px 10px;
  box-shadow: 0;
  transform: scale(0.95);
  transition: box-shadow 0.5s, transform 0.5s;
  &:hover{
    transform: scale(1);
    box-shadow: 5px 20px 30px rgba(0,0,0,0.2);
  }
  
  .container{
    width:100%;
    height:100%;
    .top{
      height: 80%;
      width:100%;
  -webkit-background-size: 100%;
  -moz-background-size: 100%;
  -o-background-size: 100%;
  background-size: cover;
  
    }
    .bottom{
      width: 200%;
      height: 20%;
      transition: transform 0.5s;
      &.clicked{
        transform: translateX(-50%);
      }
      h1{
          margin:0;
          padding:0;
      }
      p{
          margin:0;
          padding:0;
      }
      .left{
        height:100%;
        width: 50%;
        background: #f4f4f4;
        position:relative;
        float:left;
        .details{
          padding: 20px;
          float: left;
          // width: calc(70% - 40px);
        }
        .buy{
          float:right;
          width: calc(30% - 2px);
          height:100%;
          background: #f1f1f1;
          transition: background 0.5s;
          border-left:solid thin rgba(0,0,0,0.1);
          i{
            font-size:30px;
            padding:30px;
            color: #254053;
            transition: transform 0.5s;
          }
          &:hover{
            background: #A6CDDE;
          }
          &:hover i{
            transform: translateY(5px);
            color:#00394B;
          }
        }
      }
      .right{
        width: 50%;
        background: #A6CDDE;
        color: white;
        float:right;
        height:200%;
        overflow: hidden;
        .details{
          padding: 20px;
          float: right;
          // width: calc(70% - 40px);
        }
        .done{
          width: calc(30% - 2px);
          float:left;
          transition: transform 0.5s;
          border-right:solid thin rgba(255,255,255,0.3);
          height:50%;
          i{
            font-size:30px;
            padding:30px;
            color: white;
          }
        }
        .remove{
          width: calc(30% - 1px);
          clear: both;
          border-right:solid thin rgba(255,255,255,0.3);
          height:50%;
          background: #BC3B59;
          transition: transform 0.5s, background 0.5s;
          &:hover{
            background: #9B2847;
          }
          &:hover i{
            transform: translateY(5px);
          }
          i{
            transition: transform 0.5s;
            font-size:30px;
            padding:30px;
            color: white;
          }
        }
        &:hover{
          .remove, .done{
            transform: translateY(-100%);
          }
        }
      }
    }
  }
  
  .inside{
    z-index:9;
    background: #92879B;
    width:140px;
    height:140px;
    position: absolute;
    top: -70px;
    right: -70px;
    border-radius: 0px 0px 200px 200px;
    transition: all 0.5s, border-radius 2s, top 1s;
    overflow: hidden;
    .icon{
      position:absolute;
      right:85px;
      top:85px;
      color:white;
      opacity: 1;
    }
    &:hover{
      width:100%;
      right:0;
      top:0;
      border-radius: 0;
      height:80%;
      .icon{
        opacity: 0;
        right:15px;
        top:15px;
      }
      .contents{
        opacity: 1;
        transform: scale(1);
        transform: translateY(0);
      }
    }
    .contents{
      padding: 5%;
      opacity: 0;
      transform: scale(0.5);
      transform: translateY(-200%);
      transition: opacity 0.2s, transform 0.8s;
      table{
        text-align:left;
        width:100%;
      }
      h1, p, table{
        color: white;
      }
      p{
        font-size:13px;
      }
    }
  }
} 
.prices {
  display: flex;
  justify-content: space-evenly;
  font-weight: bold;
  font-size: 30px;
}
.prices span:first-of-type{
  color:#9B2847;
  text-decoration: line-through;

}


</style>