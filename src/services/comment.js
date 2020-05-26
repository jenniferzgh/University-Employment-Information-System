export default {
  trimTreeData (data) {
    // 循环遍历json数据
    for (var i = 0; i < data.length; i++) {

      if (data[i].children.length < 1) {
        // children若为空数组，则将children设为undefined
        data[i].children = undefined
      } else {
        // children若不为空数组，则继续 递归调用 本方法
        this.trimTreeData(data[i].children)
      }
    }
    return data
  },
  handleAvatarSuccess (res, file) {
    this.imageUrl = URL.createObjectURL(file.raw)
  },
  beforeAvatarUpload (file) {
    const isJPG = file.type === 'image/jpeg'
    const isLt2M = file.size / 1024 / 1024 < 2

    if (!isJPG) {
      this.$message.error('上传头像图片只能是 JPG 格式!')
    }
    if (!isLt2M) {
      this.$message.error('上传头像图片大小不能超过 2MB!')
    }
    return isJPG && isLt2M
  }

}