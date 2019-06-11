let Common = {
  //文本框增加title提示
  setInputTextTitle(key) {
    var input = $("#" + key).find("input[type='text']");
    for (var i = 0; i < input.length; i++) {
      $(input[i]).attr("title", $(input[i]).val());
    }
  },
  // 验证是否为空
  isEmpty(item, prompt) {
    item = item.replace(/\ +/g, "")
    if (!item || item == null || item == undefined) {
      console.log(prompt)
      return;
    }
  },
  // 去除两边空格
  trim(item) {
    return item.replace(/\ +/g, "")
  }
}

export default Common;