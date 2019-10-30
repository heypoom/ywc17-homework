import 'whatwg-fetch'

interface NavbarItem {
  href: string
  label: string
}

interface PageData {
  condition: string
  detail: string
  duration: string
  navbarItems: NavbarItem[]
}

async function loadPageData(): Promise<PageData> {
  const payload = await fetch('https://panjs.com/ywc.json')

  return payload.json()
}

function setNavbar(items: NavbarItem[]) {
  const element = document.querySelector('header.navbar')
  if (!element) return

  items.forEach(item => {
    element.innerHTML += `<a href="${item.href}" class="nav-link fade in" target="_blank">${item.label}</a>`
  })
}

function setData(selector: string, data: string) {
  const element = document.querySelector(selector)
  if (element) element.innerHTML = data
}

async function onReady() {
  const data = await loadPageData()

  setNavbar(data.navbarItems)

  setData('.duration', data.duration)
  setData('.detail', data.detail)
  setData('.condition', data.condition)
}

document.addEventListener('DOMContentLoaded', onReady)
