# basic-tools

- Common utility function packages（常用的实用工具函数包）
- npm-url：[npm](https://www.npmjs.com/package/basic-tools)

<br>
<br>

## Installation

You can install with npm:

```
$ npm install basic-tools
```
<br>

## Usage

```
import basicTools from 'basic-tools'
```
<br>

## Function
### query(name, querystring)
- Function for gets the value of the specified name in the specified querystring
```
basicTools.query('name', '?name=js') //return 'js'
```
<br>

### serialize(data)
- Function for turn the object into a url string
```
basicTools.serialize({hello: 'js'}) //return '?hello=js'
```
<br>

### $(selector)
- Function for simulating jQuery
```
basicTools.$(selector) //return {DOM|undefined}
```
<br>

### removeNode(node)
- Function for Deleting DOM node
```
basicTools.removeNode(node) //delete {node}
```
<br>

### insertAfter(node)
- Function for inserting the node node after the target node
```
basicTools.insertAfter(node, target) 
```
<br>

### addClass(node, className)
- Function for add class name
```
basicTools.addClass(node, className) //add class
```
<br>

### removeClass(node, className)
- Function for remove class name
```
basicTools.removeClass(node, className) //removeClass
```
<br>

### getAbsoluteUrl(url)
- Function for get absolute url
```
basicTools.getAbsoluteUrl('/xxxx') //return 'https://github.com/xxxx'
```
<br>

### debounce(callback, time)
- Function for avoiding shake


<br>


### removeItemByIndex(index, arr)
- Function for remove item by index
```
basicTools.removeItemByIndex(1, [1, 2, 3]) //return [1, 3]
```
<br>