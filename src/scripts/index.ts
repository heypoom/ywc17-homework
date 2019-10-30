interface NavbarItem {
  href: string
  label: string
}

interface ContentResponse {
  condition: string
  detail: string
  duration: string
  navbarItems: NavbarItem[]
}

async function loadContent(): Promise<ContentResponse> {
  const payload = await fetch('https://panjs.com/ywc.json')

  return payload.json()
}

function setNavbar(items: NavbarItem[]) {
  const navEl = document.querySelector('header.navbar')

  for (let item of items) {
    navEl.innerHTML += `<a href="${item.href}" class="nav-link" target="_blank">${item.label}</a>`
  }
}

async function onReady() {
  const content = await loadContent()
  console.log(content)

  setNavbar(content.navbarItems)
}

document.addEventListener('DOMContentLoaded', onReady)
