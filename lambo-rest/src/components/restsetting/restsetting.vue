<template>
  <Layout>
    <Sider hide-trigger :style="{background: '#fff'}" width="300">
      <Tree :data="data1"></Tree>
    </Sider>
    <Content>
      <lambo-edit-table ref="table1"  v-model="datas" :columns="columns"></lambo-edit-table>
    </Content>
  </Layout>
</template>

<script>
  export default {
    data () {
      return {
        data1: [
          {
            title: 'parent 1',
            expand: true,
            children: [
              {
                title: 'parent 1-1',
                expand: true,
                children: [
                  {
                    title: 'leaf 1-1-1'
                  },
                  {
                    title: 'leaf 1-1-2'
                  }
                ]
              },
              {
                title: 'parent 1-2',
                expand: true,
                children: [
                  {
                    title: 'leaf 1-2-1'
                  },
                  {
                    title: 'leaf 1-2-1'
                  }
                ]
              }
            ]
          }
        ],
        columns: [
          {
            title: '序号',
            type: 'index',
            width: 180,
            align: 'center'
          },
          {
            title: '姓名',
            align: 'center',
            key: 'name',
            width: 190,
            editor:{
              type:"text",
              //校验函数,参数分别为：新值、旧值、行数据、行号
              validate:function(newVal,oldVal,row,index){
                if(newVal.trim() == ""){
                  return{
                    valid:false,
                    msg:"输入不能为空！"
                  }
                }
                return{valid:true}
              }
            }
          },
          {
            title: '性别',
            align: 'center',
            width: 150,
            key: 'sex',
            editor:{
              type:"select",
              enums:[{"value":"1","label":"男"},{"value":"0","label":"女"}]
            }
          },
          {
            title: '组织',
            align: 'center',
            key: 'organName'
          }
        ],
        datas: [
          {
            name: 'Aresn',
            sex: '1',
            organId: '4',
            organName: '河北分部'
          },
          {
            name: 'Lison',
            sex: '1',
            organId: '5',
            organName: '河南分部'
          },
          {
            name: 'lisa',
            sex: '0',
            organId: '5',
            organName: '河南分部'
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
