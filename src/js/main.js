import $ from '../local_modules/jquery/dist/jquery.min'

/* дефолтное состояние сайдбара в зависимости от дата-атрибута на body */
$(document).ready(() => {
    if ($(`body`).data(`initial-state-sidebar`) === `middle`) {
        $(`.header`).css(`padding-left`, `133px`)
        $(`.main`).css(`padding-left`, `118px`)
        $(`.sidebar__sub`).css(`right`, `0`)
        $(`.sidebar__main`).css(`width`, `118px`)

    } else if ($(`body`).data(`initial-state-sidebar`) === `min`) {
        $(`.sidebar`).addClass(`closed`)
        $(`.sidebar__main`).css(`width`, `52px`)
        $(`.sidebar__sub`).css(`right`, `64px`)
        $(`.header`).css(`padding-left`, `67px`)
        $(`.main`).css(`padding-left`, `52px`)
    }
})

/* открытие всех родителей элемента, у которого класс active */
function openParent(element) {
    if (element.parent().is(`:not(.main-list)`)) {
        element.parent().addClass(`active`)
        element.parent().css(`height`, `auto`)
        element = element.parent()
        openParent(element)
    }
    // element.parent().addClass(`active`)
    element.parents(`.main-list`).addClass(`active`)
}

/* если был ли выбран какой-то из пунтов до перезагрузки */
$(document).ready(() => {
    if ($(`.menu-item`).is(`.active`)) {

        // чтобы у выбранного пункта был открыт вложенный список, если он есть
        $(`.menu-item.active`).children(`ul`) && $($(`.menu-item.active`).children(`ul`)[0]).css(`height`, `auto`)


        if ($(`.menu-item.active`).parents().is(`.sidebar__sub`)) {
            /* элемент в правой колонке */

            // открытие правой части сайдбара
            $(`.sidebar__sub`).css(`right`, `-136px`)
            $(`.header`).css(`padding-left`, `254px`)
            $(`.main`).css(`padding-left`, `254px`)

            // открытие всех родителей элемента внутри правой части сайдбара
            const activeElement = $(`.menu-item.active`)[0]
            openParent($(activeElement))

            // дата-атрибут списка, в котором находится активный элемент
            const dataAttr = $(`.menu-item.active`).parents(`.main-list`).data(`listId`)

            // ищем в левой части сайдбара пункт, который по id связан с дата-атрибутом списка, в котором активный элемент
            $(`.menu__sub-item > a`).map(function (i, it) {
                if (it.id === dataAttr) {
                    openParent($(it))
                }
            })

        } else {
            /* элемент в левой колонке */
            openParent($(`.menu-item.active`))
        }
    }
})

function makeSidebarBig(sidebarSpeed, headerSpeed) {
    $(`.sidebar__sub`).animate({
        right: `-136px`
    }, sidebarSpeed)
    $(`.header`).animate({
        paddingLeft: `254px`
    }, headerSpeed)

    $(`.main`).animate({
        paddingLeft: `254px`
    }, headerSpeed)
}

function makeSidebarMiddle(sidebarSpeed, headerSpeed) {
    $(`.header`).animate({
        paddingLeft: `133px`
    }, headerSpeed)

    $(`.main`).animate({
        paddingLeft: `118px`
    }, headerSpeed)

    $(`.sidebar__sub`).animate({
        right: 0
    }, sidebarSpeed)

    $(`.sidebar__main`).animate({
        width: `118px`
    })
}

function makeSidebarMin(sidebarSpeed, headerSpeed) {
    $(`.sidebar`).addClass(`closed`)

    $(`.sidebar__main`).animate({
        width: `52px`
    })
    $(`.sidebar__sub`).animate({
        right: `64px`
    }, 100)
    $(`.header`).animate({
        paddingLeft: `67px`
    }, headerSpeed)

    $(`.main`).animate({
        paddingLeft: `52px`
    }, headerSpeed)
}


/* закрытие-открытие сайдбара */
$(document).ready(() => {
    // сдвиг хедера и контента при закрытии-открытии сайдбара
    $(`.sidebar__collapse-button`).click(function () {
        if ($(`.sidebar`).hasClass(`closed`)) {
            makeSidebarMiddle(400, 400)
            $(`.sidebar`).removeClass(`closed`)
        } else {
            makeSidebarMin(400, 400)
            $(`.sidebar`).addClass(`closed`)
        }

    })
})

/* закрытие-открытие серой колонки сайдбара */
$(`.sidebar__sub-collapse-button`).click(function () {
    makeSidebarMiddle(400, 400)
})

/* закрытие-открытие дропдауна (выпадающий список в хедере) */

$(`.dropdown__btn`).click(function () {
    if ($(this).parent().is(`.closed`)) {
        $(this).parent().removeClass(`closed`)
        $(this).next().animate({
            borderWidth: `2px`,
            height: $(this).next().get(0).scrollHeight + 4
        }, {
            // start: function () {
            //     $(this).next().css(`border`, `2px solid #1f2229`)
            // }
        })
    } else {
        $(this).parent().addClass(`closed`)
        $(this).next().animate({
            borderWidth: 0,
            height: 0
        })
    }
    // $(this).parent().toggleClass(`closed`)
})


/* переключение пунктов и подпунктов меню */
$(document).ready(() => {
    function switchActiveMenuItem(menuItem, currentMenuItem) {
        menuItem.removeClass(`active`)
        currentMenuItem.addClass(`active`)
    }

    $(`.menu__item`).click(function (evt) {
        switchActiveMenuItem($(`.menu__item`), $(evt.currentTarget))
    })

    $(`.menu__sub-item`).click(function (evt) {
        switchActiveMenuItem($(`.menu__sub-item`), $(evt.currentTarget))
    })

    $(`.sub-menu__item`).click(function (evt) {
        switchActiveMenuItem($(`.sub-menu__item`), $(evt.currentTarget))
    })
})

window.j = $

/* открытие-закрытие вложенных списков сайдбара */
$(document).ready(() => {
    // menu-item > a - главный пункт
    // nested-menu-list - вложенный в него список
    $(`.menu-item > a`).click(function (evt) {
        ($(evt.currentTarget).parent().parent().children().children(`.nested-menu-list`)).not($(evt.currentTarget).next()).animate({
            height: 0,
        }, {
            duration: 400
        })

        if ($(evt.currentTarget).next().height()) {
            $(evt.currentTarget).next().animate({
                height: 0,
            })
        } else {
            $(evt.currentTarget).next().get(0) && $(evt.currentTarget).next().animate({
                height: $(evt.currentTarget).next().get(0).scrollHeight,
            })
        }
    })
})

/* переключение списков в серой колонке по клику на подпункты в левой */
$(document).ready(() => {
    $(`.menu__sub-item`).click(function (evt) {
        $(`.sidebar__sub > .sub-menu`).map(function () {
            if ($(this).data(`list-id`) === evt.target.id) {
                $(`.sidebar__sub > .sub-menu`).removeClass(`active`)
                $(this).addClass(`active`)
            }
        })
    })
})

/* показ-скрытие серой колонки */
$(`.menu__sub-item > a`).click(function (evt) {

    if (evt.target.id) {
        makeSidebarBig(400, 400)
    } else {
        makeSidebarMiddle(400, 400)
    }
})

/* переключение свитча */

// $(`.switch`).not(`.disabled`).click(function () {
//     $(this).toggleClass(`on`)
// })


/* Переключение табов */
$(`.filter-options li`).not(`.disabled`).click(function () {
    $(this).parent().children(`li`).removeClass(`active`)
    $(this).addClass(`active`)


    const id = $(this).data(`target`).toString()
    $(`.tab-container`).map(function () {
        $(this).removeClass(`active`)
        $(this).hasClass(id) && $(this).addClass(`active`)
    })
})

/* селект */

$(`.select`).click(function () {
    $(this).children(`.select__options`).toggle()
    $(this).toggleClass(`closed`)
})

$(`.select__item`).click(function () {
    $(this).parents(`.select__options`).next()[0].selectedIndex = $(this).index()
    const selectedText = $($(this).children(`a`)[0]).text()
    $($($(this).parents(`.select`).children(`.select__visible`))[0]).text(selectedText)
})
