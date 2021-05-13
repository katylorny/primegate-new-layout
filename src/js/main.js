import $ from '../local_modules/jquery/dist/jquery.min'

$(document).ready(() => {
    let mainActiveItem = null
    $(`.main-item`).click((evt) => {
        handleMainItemClick(evt.currentTarget)
    })

    $(`.menu-item a`).click((evt) => {
        makeLinkActive(evt)
    })


    function openSidebar() {
        $(`.sidebar`).addClass(`opened`)
        $(`.main`).addClass(`opened-sidebar`)
        $(`.header`).addClass(`opened-sidebar`)
    }

    function closeSidebar() {
        $(`.sidebar`).removeClass(`opened`)
        $(`.main`).removeClass(`opened-sidebar`)
        $(`.header`).removeClass(`opened-sidebar`)
    }

    function handleMainItemClick(activeItem) {
        if (activeItem === mainActiveItem && $(activeItem).hasClass(`with-nested`)) {
            $(`.sidebar`).toggleClass(`opened`)
            $(`.main`).toggleClass(`opened-sidebar`)
            $(`.header`).toggleClass(`opened-sidebar`)
            showNestedItems(activeItem)
            return
        }
        mainActiveItem = activeItem
        if ($(activeItem).hasClass(`with-nested`)) {
            showNestedItems(activeItem)
            openSidebar()

        } else {
            closeSidebar()
        }
    }

    function showNestedItems(mainItem) {
        $(`.menu-items__nested-list`).map((i, el) => {
            $(el).hide()
            if ($(el).hasClass(`${mainItem.dataset.name}`)) {
                $(el).show()
                $(`.menu-items-title`).css(`margin-top`, `${($(mainItem).index() - 1) * 31}px`)
            }
        })
    }

    function showChildren(e) {
        const menuItem = e.currentTarget

        if ($(menuItem.nextSibling).hasClass(`nested-menu-items`) && $(menuItem).hasClass(`opened`)) {
            $(menuItem).removeClass(`opened`)
            $(menuItem.nextSibling).removeClass(`opened`)
        } else if ($(menuItem.nextSibling).hasClass(`nested-menu-items`)) {
            $(menuItem).addClass(`opened`)
            $(menuItem.nextSibling).addClass(`opened`)
        }
    }

    function makeLinkActive(e) {
        const clickedLink = e.currentTarget
        $(`.menu-item a`).removeClass(`active`)
        $(clickedLink).addClass(`active`)

        if (!$($($(clickedLink).parent()[0]).parent()[0].previousSibling).hasClass(`menu-item-with-nested`)) {
            $(`.menu-item-with-nested`).removeClass(`opened`)
            $(`.nested-menu-items`).removeClass(`opened`)
        }

        showChildren(e)
    }
})
