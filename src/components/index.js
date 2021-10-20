// 加载组件
// import uploadItem from './upload-item' // 上传文件组件
// import uploadDialog from './upload-dialog' // 上传文件弹框
// import chooseDate from './choose-date' // 选择起止日期
// import defaultDialog from './default-dialog' // 默认弹框
// import selectItem from './select-item' // 选择框
// import inputFile from './input-file' // 上传文件
// import inputCheck from './input-check' // 带错误提示的input
// import steps from './steps' // 步骤条
// import pages from './pages' // 分页
import breadCrumb from './bread-crumb'  // 面包屑
import breadTag from './bread-tag'  //  tag
// 组件list
const components = [breadCrumb,breadTag]
// const components = [uploadItem, uploadDialog, chooseDate, inputFile, defaultDialog, selectItem, inputCheck, steps, pages]
// 绑定到全局
const commonComponents = {
  install: function (Vue) {
    components.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}
export default commonComponents
