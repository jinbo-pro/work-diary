/**
 * 10种排序算法
 * https://www.cnblogs.com/herozhi/p/5880939.html
 */

// 源数组
function createArray(len) {
  var result = []
  for (var i = 0; i < len; i++) {
    var num = parseInt(Math.random() * len * 10)
    result.push(num)
  }
  return result
}
// 冒泡排序 1
function bubbleSort(arr) {
  var len = arr.length
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        // 相邻元素两两对比
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}
// 冒泡排序 2
function bubbleSort2(arr) {
  var low = 0
  var high = arr.length - 1 //设置变量的初始值
  var tmp, j
  while (low < high) {
    for (
      j = low;
      j < high;
      ++j //正向冒泡,找到最大者
    )
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    --high //修改high值, 前移一位
    for (
      j = high;
      j > low;
      --j //反向冒泡,找到最小者
    )
      if (arr[j] < arr[j - 1]) {
        ;[arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]
      }
    ++low //修改low值,后移一位
  }
  return arr
}
// 冒泡排序 3
function bubbleSort3(arr) {
  var i = arr.length - 1 //初始时,最后位置保持不变
  while (i > 0) {
    var pos = 0 //每趟开始时,无记录交换
    for (var j = 0; j < i; j++)
      if (arr[j] > arr[j + 1]) {
        pos = j //记录交换的位置
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]] // ES6 的解构来进行元素交换
      }
    i = pos //为下一趟排序作准备
  }
  return arr
}
// 选择排序
function selectionSort(arr) {
  var len = arr.length
  var minIndex, temp
  for (var i = 0; i < len - 1; i++) {
    minIndex = i
    for (var j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        //寻找最小的数
        minIndex = j //将最小数的索引保存
      }
    }
    temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
  }
  return arr
}

/**
 * 方法说明：插入排序
 * @param {Array} array 待排序数组
 * @return {Array}
 */
function insertionSort(array) {
  if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
    for (var i = 1; i < array.length; i++) {
      var key = array[i]
      var j = i - 1
      while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j]
        j--
      }
      array[j + 1] = key
    }
    return array
  } else {
    return 'array is not an Array!'
  }
}

function binaryInsertionSort(array) {
  if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
    for (var i = 1; i < array.length; i++) {
      var key = array[i],
        left = 0,
        right = i - 1
      while (left <= right) {
        var middle = parseInt((left + right) / 2)
        if (key < array[middle]) {
          right = middle - 1
        } else {
          left = middle + 1
        }
      }
      for (var j = i - 1; j >= left; j--) {
        array[j + 1] = array[j]
      }
      array[left] = key
    }
    return array
  } else {
    return 'array is not an Array!'
  }
}
/**
 * 方法说明：希尔排序
 * @param {Array} arr 待排序数组
 * @return {Array}
 */
function shellSort(arr) {
  var len = arr.length,
    temp,
    gap = 1
  while (gap < len / 5) {
    //动态定义间隔序列
    gap = gap * 5 + 1
  }
  for (gap; gap > 0; gap = Math.floor(gap / 5)) {
    for (var i = gap; i < len; i++) {
      temp = arr[i]
      for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j]
      }
      arr[j + gap] = temp
    }
  }
  return arr
}
/**
 * 方法说明：归并排序
 * @param {Array} arr 待排序数组
 * @return {Array}
 */
function mergeSort(arr) {
  //采用自上而下的递归方法
  var len = arr.length
  if (len < 2) {
    return arr
  }
  var middle = Math.floor(len / 2),
    left = arr.slice(0, middle),
    right = arr.slice(middle)
  return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
  var result = []
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }

  while (left.length) result.push(left.shift())

  while (right.length) result.push(right.shift())
  return result
}
/**
 * 方法说明：快速排序
 * @param {Array} array 待排序数组
 * @return {Array}
 */
//方法一
function quickSort(array, left, right) {
  if (
    Object.prototype.toString.call(array).slice(8, -1) === 'Array' &&
    typeof left === 'number' &&
    typeof right === 'number'
  ) {
    if (left < right) {
      var x = array[right],
        i = left - 1
      // temp;
      for (var j = left; j <= right; j++) {
        if (array[j] <= x) {
          i++
          ;[array[i], array[j]] = [array[j], array[i]]
        }
      }
      quickSort(array, left, i - 1)
      quickSort(array, i + 1, right)
    }
    return array
  } else {
    return 'array is not an Array or left or right is not a number!'
  }
}

//方法二
var quickSort2 = function (arr) {
  if (arr.length <= 1) {
    return arr
  }
  var pivotIndex = Math.floor(arr.length / 2)
  var pivot = arr.splice(pivotIndex, 1)[0]
  var left = []
  var right = []
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort2(left).concat([pivot], quickSort2(right))
}

/**
 * 方法说明：堆排序
 * @param {Array} array 待排序数组
 * @return {Array}
 */
function heapSort(array) {
  if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
    //建堆
    var heapSize = array.length
    // temp;

    for (var i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
      heapify(array, i, heapSize)
    }

    //堆排序
    for (var j = heapSize - 1; j >= 1; j--) {
      ;[array[0], array[j]] = [array[j], array[0]]
      heapify(array, 0, --heapSize)
    }
    return array
  } else {
    return 'array is not an Array!'
  }
}
/*方法说明：维护堆的性质
@param  arr 数组
@param  x   数组下标
@param  len 堆大小*/
function heapify(arr, x, len) {
  if (Object.prototype.toString.call(arr).slice(8, -1) === 'Array' && typeof x === 'number') {
    var l = 2 * x + 1,
      r = 2 * x + 2,
      largest = x
    // temp;
    if (l < len && arr[l] > arr[largest]) {
      largest = l
    }
    if (r < len && arr[r] > arr[largest]) {
      largest = r
    }
    if (largest != x) {
      ;[arr[x], arr[largest]] = [arr[largest], arr[x]]
      heapify(arr, largest, len)
    }
  } else {
    return 'arr is not an Array or x is not a number!'
  }
}
