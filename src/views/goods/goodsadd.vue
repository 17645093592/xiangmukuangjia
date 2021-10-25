<template>
  <div>
      <breadTag></breadTag>
        <div class="container">
             <breadCrumb></breadCrumb>
             <el-alert
                title="添加商品信息"
                type="success"
                center
                show-icon>
            </el-alert>
             <el-steps :active="1*active" finish-status="success" align-center simple style="margin: 20px 0">
                <el-step title="基本信息" ></el-step>
                <el-step title="商品参数" ></el-step>
                <el-step title="商品属性" ></el-step>
                <el-step title="商品图片" ></el-step>
                <el-step title="商品内容" ></el-step>
             </el-steps>   
             <el-form label-position="top" label-width="80px" :model="form" style="height:300px;overflow:auto">
                <el-tabs v-model="active" tab-position="left" >
                    <el-tab-pane name='1' label="基本信息">
                        <el-form-item label="商品名称">
                            <el-input v-model="form.cat_name"></el-input>
                        </el-form-item>
                        <el-form-item label="商品价格">
                            <el-input v-model="form.cat_price"></el-input>
                        </el-form-item>
                        <el-form-item label="商品重量">
                            <el-input v-model="form.cat_weight"></el-input>
                        </el-form-item>
                        <el-form-item label="商品数量">
                            <el-input v-model="form.cat_number"></el-input>
                        </el-form-item>
                         <el-form-item label="商品分类">
                             <el-cascader
                                v-model="value"
                                :options="options"
                                @change="handleChange">
                            </el-cascader>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane name='2' label="商品参数">商品参数</el-tab-pane>
                    <el-tab-pane name='3' label="商品属性">商品属性</el-tab-pane>
                    <el-tab-pane name='4' label="商品图片">商品图片</el-tab-pane>
                    <el-tab-pane name='5' label="商品内容">商品内容</el-tab-pane>
                </el-tabs>
            </el-form>
             
                 <!-- 
                <el-form-item label="活动区域">
                    <el-input v-model="formLabelAlign.region"></el-input>
                </el-form-item>
                <el-form-item label="活动形式">
                    <el-input v-model="formLabelAlign.type"></el-input>
                </el-form-item> -->
        </div>
  </div>
</template>

<script>
export default {
    data() {
      return {
        active:'1',
        form:{},
        value: [],
        options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }]
      };
    },
    methods: {
        handleChange(){

        }
    }
}
</script>

<style>

</style>