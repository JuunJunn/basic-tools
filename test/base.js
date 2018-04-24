const base = require('../src/base.js')

const tpl = '<div id="id">Div element<span class="test">Span element</span></div>'

test('query', () => {
  expect(base.query('hi', '?hi=test')).toBe('test')
  expect(base.query('hi', '?hi=')).toBe('')
  expect(base.query('hi', '?hi2=')).toBe(undefined)
  expect(base.query('hi', '?hii=')).toBe(undefined)
  expect(base.query('hi', '?hii=test')).toBe(undefined)
  expect(base.query('hi', '?hi=5')).toBe('5')
})

test('serialize', () => {
  expect(typeof (base.serialize({data: 'data', name: 'juun'}))).toBe('string')
  expect(base.serialize({data: 'data', name: 'juun'})).toBe('?data=data&name=juun')
  expect(base.serialize([1, 2, 3])).toBe('?0=1&1=2&2=3')
  expect(base.serialize(true)).toBe('param should be object')
  expect(base.serialize(3)).toBe('param should be object')
  expect(base.serialize('[1, 2]')).toBe('param should be object')
  expect(base.serialize({})).toBeNull
  expect(base.serialize([])).toBeNull
})

test('removeItemByIndex', () => {
  expect(base.removeItemByIndex(1, [1, 2, 3])).toEqual([1, 3])
  expect(base.removeItemByIndex(1, [1, 3])).toEqual([1])
  expect(base.removeItemByIndex(0, [1])).toEqual([])
  expect(base.removeItemByIndex(2, [1, 3])).toBeNull
  expect(base.removeItemByIndex(2, [])).toBeNull
})

describe('$', () => {
  test('$', () => {
    document.body.innerHTML = tpl
  
    expect(base.$('#id').innerHTML).toBe('Div element<span class="test">Span element</span>')
    expect(base.$('div').innerHTML).toBe('Div element<span class="test">Span element</span>')
    expect(base.$('.test').innerHTML).toBe('Span element')
  })
  test('selector is null', () => {
    expect(base.$('')).toBeFalsy
  })
})

describe('removeNode', () => {
  test('removeNode', () => {
    document.body.innerHTML = tpl
    const divEle = document.querySelector('div')
    const spanEle = document.querySelector('span')
    base.removeNode(spanEle)
  
    expect(divEle.innerHTML).toBe('Div element')
    base.removeNode(divEle)
    expect(divEle).toBeNull
    expect(base.removeNode()).toBeNull
  })

  test('node is undefiend', () => {
    expect(base.removeNode()).toBeFalsy
  })
})

describe('insertAfter', () => {
  document.body.innerHTML = `<ul>
  <li>item</li>
  <li>item</li>
</ul>`

const ul = document.querySelector('ul')
const firstLI = ul.firstElementChild
const liTextNode = firstLI.firstChild
const lastLi = ul.lastElementChild
const newLi = document.createElement('li')
const textNode = document.createTextNode('new item')
newLi.appendChild(textNode)

  test('insertAfter', () => {
    base.insertAfter(newLi, firstLI)// 在第一个 item 后面插入一个 new item
    expect(ul.children.length).toBe(3)// 增加一个  children +1 =3
    expect(firstLI.nextElementSibling.innerHTML).toBe('new item')// 验证第一个 item 后面新加的 new item
  
    base.insertAfter(newLi, lastLi)// 在最后一个item后面插一个
    expect(ul.children.length).toBe(3)// 增加一个  children +1 =3
    expect(lastLi.nextElementSibling.innerHTML).toBe('new item')// 验证第一个 item 后面新加的 new item
  })
  test('nodeType must be 1', () => {
    expect(base.insertAfter(newLi, liTextNode)).toBeFalsy
  })
})


test('addClass', () => {
  document.body.innerHTML = '<div>Div Element</div><div class="old">Div Element</div>'
  const divEle = document.querySelector('div')// 拿第一个 div

  base.addClass(divEle, 'new')
  expect(divEle.classList.contains('new')).toBe(true)// 验证是否有新的 className

  const divOld = document.querySelector('.old')
  base.addClass(divOld, 'new')
  expect(divOld.classList.contains('new')).toBe(true)// 验证是否有新的 className
  expect(divOld.className).toBe('old new')

  expect(base.addClass(divOld, '')).toBe(undefined)
})

describe('removeClass', () => {
  document.body.innerHTML = '<div class="item-tab active">Div Element</div><div class="item-tab">Div Element</div>'
  const divEle = document.querySelector('div')// 拿第一个 div

  test('removeClass', () => {
    base.removeClass(divEle, 'active')
    expect(divEle.classList.contains('active')).toBe(false)// 验证是否去掉 active
  })
  test('className is null', () => {
    expect(base.removeClass(divEle, '')).toBeFalsy
    expect(base.removeClass('active')).toBeFalsy
  })
})

describe('debounce', () => {
  jest.useFakeTimers()//使用jest mock 时间

  test('debounce', () => {
    const callback = jest.fn()
    const debounce = base.createDebounce(callback, 50)
    debounce()
    expect(callback).not.toBeCalled()
    // jest.runOnlyPendingTimers()
    jest.runAllTimers()//快进 api  Fast-forward until all timers have been executed
    expect(callback).toBeCalled()
  })

  test('point at time', () => {
    
    const callback = jest.fn()
    const debounce = base.createDebounce(callback, 50)
    debounce()
    jest.advanceTimersByTime(49)
    expect(callback).not.toBeCalled()
    jest.advanceTimersByTime(1)
    expect(callback).toBeCalled()
  })

})


describe('getAbsoluteUrl', () => {
  test('getAbsoluteUrl', () => {
    var a = base.getAbsoluteUrl('/about')
    expect(a).toBe('/about')
  })

  test('url is null', () => {
    expect(base.getAbsoluteUrl()).toBeNull()
  })
})