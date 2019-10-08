const filterTheme = [
    {
        type: 'category',
        title: '카테고리',
        value : ['패션', '유아동/키즈', '잡화/화장품', '리빙/라이프', '음료/음식', '가전', '기타'],
    },
    {
        type: 'products',
        title: '상품구분',
        value : ['반응형', 'PC+Mobile', 'PC', 'Mobile'],
    },
    {
        type: 'price',
        title: '가격',
        value : ['무료', '유료', '직접입력'],
    },
    {
        type: 'layouts',
        title: '레이아웃',
        value : ['와이드', '2단 좌측', '2단 우측', '3단 기본', '3단 좌측', '3단 우측'],
    },
    {
        type: 'colors',
        title: '대표색상',
        value : ['#ef1c00', '#e66f2b', '#f1bb00', '#1eb100', '#ebe4c2', '#b4e2ea', '#257cd3', '#9149c9', '#e861a3', '#8a6d59', '#fff', '#cbcbcb', '#1e1e1e', 'rgba(244, 219, 82, 1), rgba(244, 219, 82, .1), rgba(244, 219, 82, 1)', 'rgba(200, 205, 211, 1), rgba(200, 205, 211, .1), rgba(200, 205, 211, 1)'],
        valueName : ['Scarlet', 'Carrot', 'Selective Yellow', 'Limeade', 'Fall Green', 'Powder Blue', 'Mariner', 'DarkOrchid', 'Azalea', 'Copper', 'White', 'Silver', 'Black', 'Gold', 'Iron'],
    },
    {
        type: 'partners',
        title: '파트너등급',
        value : ['플래티넘', '골드', '실버', '브론즈'],
    },
]

module.exports = filterTheme;
