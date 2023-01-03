describe('empty spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/checkout')
    cy.get('.common__section').click()
    
})

  it('01_checkout[Pago] con datos válidos', () => {

      cy.get(':nth-child(1) > input').click({force: true}).type('juan')
      cy.get(':nth-child(2) > input').click({force: true}).type('juan@gmail.com')
      cy.get(':nth-child(3) > input').click({force: true}).type('88324592')
      cy.get(':nth-child(4) > select').select('Costa Rica', { force: true })
      cy.get(':nth-child(5) > select').select('Guanacaste', { force: true })
      cy.get(':nth-child(6) > select').select('Tilaran', { force: true })
      cy.get(':nth-child(7) > input').click({force: true}).type('50801')
      cy.get(':nth-child(8) > input').click({force: true}).type('Distrito de los ángeles frente la plaza')

      cy.get('.billing__form > :nth-child(10)').click()
      cy.get('.buy__btn').click({force: true}).then(() => {
        cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'There are no products in your cart')})})

  it('02_checkout[Pago] con datos inválidos (nombre, email, celular, dirección, codPostal)-vacios', () => {

      cy.get(':nth-child(3) > input').click({force: true}).type('92836519356')
      cy.get(':nth-child(4) > select').select('Costa Rica', { force: true })
      cy.get(':nth-child(5) > select').select('Guanacaste', { force: true })
      cy.get(':nth-child(6) > select').select('Tilaran', { force: true })

      cy.get('.billing__form > :nth-child(11)').click()
      cy.get('.buy__btn').click({force: true}).then(() => {
        cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Fill all the information!')})})


  it('03_checkout[Pago] con datos inválidos (nombre, celular, dirección)', () => {

      cy.get(':nth-child(1) > input').click({force: true}).type('Lorem Ipsum Dolor Sit Amet Consectetur')
      cy.get(':nth-child(2) > input').click({force: true}).type('juan@gmail.com')
      cy.get(':nth-child(3) > input').click({force: true}).type('73854')
      cy.get(':nth-child(4) > select').select('Costa Rica', { force: true })
      cy.get(':nth-child(5) > select').select('Guanacaste', { force: true })
      cy.get(':nth-child(6) > select').select('Tilaran', { force: true })
      cy.get(':nth-child(7) > input').click({force: true}).type('203065')
      cy.get(':nth-child(8) > input').click({force: true}).type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.')

      cy.get('.billing__form > :nth-child(11)').click()
      cy.get('.buy__btn').click({force: true}).then(() => {
        cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'There are no products in your cart')})})


  it('04_checkout[Pago] con datos inválidos (email, celular, dirección)-vacios', () => {

      cy.get(':nth-child(1) > input').click({force: true}).type('juan')
      cy.get(':nth-child(3) > input').click({force: true}).type('92836519356')
      cy.get(':nth-child(4) > select').select('Costa Rica', { force: true })
      cy.get(':nth-child(5) > select').select('Guanacaste', { force: true })
      cy.get(':nth-child(6) > select').select('Tilaran', { force: true })
      cy.get(':nth-child(7) > input').click({force: true}).type('50801')
      cy.get(':nth-child(8) > input').click({force: true}).type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.')

      cy.get('.billing__form > :nth-child(10)').click()
      cy.get('.buy__btn').click({force: true}).then(() => {
        cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Fill all the information!')})})


  it('05_checkout[Pago] con datos inválidos (nombre, email, direccion, codigo postal)-vacios', () => {

      cy.get(':nth-child(3) > input').click({force: true}).type('88324592')
      cy.get(':nth-child(4) > select').select('Costa Rica', { force: true })
      cy.get(':nth-child(5) > select').select('Guanacaste', { force: true })
      cy.get(':nth-child(6) > select').select('Tilaran', { force: true })

      cy.get('.billing__form > :nth-child(11)').click()
      cy.get('.buy__btn').click({force: true}).then(() => {
        cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Fill all the information!')})})


  it('06_checkout[Pago] con datos inválidos(nombre, celular, direccion, codigo postal)-vacios', () => {

      cy.get(':nth-child(1) > input').click({force: true}).type('Lorem Ipsum Dolor Sit Amet Consectetur')
      cy.get(':nth-child(2) > input').click({force: true}).type('juan@gmail.com')
      cy.get(':nth-child(3) > input').click({force: true}).type('73854')
      cy.get(':nth-child(4) > select').select('Costa Rica', { force: true })
      cy.get(':nth-child(5) > select').select('Guanacaste', { force: true })
      cy.get(':nth-child(6) > select').select('Tilaran', { force: true })

      cy.get('.billing__form > :nth-child(10)').click()
      cy.get('.buy__btn').click({force: true}).then(() => {
        cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Fill all the information!')})})


  it('07_checkout[Pago] con datos inválidos (email, celular, codigo postal)-vacios', () => {

      cy.get(':nth-child(1) > input').click({force: true}).type('juan')
      cy.get(':nth-child(3) > input').click({force: true}).type('73854')
      cy.get(':nth-child(4) > select').select('Costa Rica', { force: true })
      cy.get(':nth-child(5) > select').select('Guanacaste', { force: true })
      cy.get(':nth-child(6) > select').select('Tilaran', { force: true })
      cy.get(':nth-child(8) > input').click({force: true}).type('Distrito de Los ángeles, frente a la plaza')

      cy.get('.billing__form > :nth-child(11)').click()
      cy.get('.buy__btn').click({force: true}).then(() => {
        cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Fill all the information!')})})


  it('08_checkout[Pago] con datos inválidos(nombre, direccion)-vacios', () => {

      cy.get(':nth-child(2) > input').click({force: true}).type('juan@gmail.com')
      cy.get(':nth-child(3) > input').click({force: true}).type('88324592')
      cy.get(':nth-child(4) > select').select('Costa Rica', { force: true })
      cy.get(':nth-child(5) > select').select('Guanacaste', { force: true })
      cy.get(':nth-child(6) > select').select('Tilaran', { force: true })
      cy.get(':nth-child(7) > input').click({force: true}).type('50801')
      cy.get(':nth-child(8) > input').click({force: true}).type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.')

      cy.get('.billing__form > :nth-child(11)').click()
      cy.get('.buy__btn').click({force: true}).then(() => {
        cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Fill all the information!')})})


  it('09_checkout[Pago] con datos inválidos(nombre, celular, codigo postal)', () => {

      cy.get(':nth-child(1) > input').click({force: true}).type('Lorem Ipsum Dolor Sit Amet Consectetur')
      cy.get(':nth-child(2) > input').click({force: true}).type('juan@gmail.com')
      cy.get(':nth-child(3) > input').click({force: true}).type('92836519356')
      cy.get(':nth-child(4) > select').select('Costa Rica', { force: true })
      cy.get(':nth-child(5) > select').select('Guanacaste', { force: true })
      cy.get(':nth-child(6) > select').select('Tilaran', { force: true })
      cy.get(':nth-child(7) > input').click({force: true}).type('203065')
      cy.get(':nth-child(8) > input').click({force: true}).type('Distrito de los ángeles frente la plaza')

      cy.get('.billing__form > :nth-child(11)').click()
      cy.get('.buy__btn').click({force: true}).then(() => {
        cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'There are no products in your cart')})})


  it('10_checkout[Pago] con datos inválidos(nombre, direccion)-vacios', () => {

      cy.get(':nth-child(1) > input').click({force: true}).type('Lorem Ipsum Dolor Sit Amet Consectetur')
      cy.get(':nth-child(3) > input').click({force: true}).type('88324592')
      cy.get(':nth-child(4) > select').select('Costa Rica', { force: true })
      cy.get(':nth-child(5) > select').select('Guanacaste', { force: true })
      cy.get(':nth-child(6) > select').select('Tilaran', { force: true })
      cy.get(':nth-child(7) > input').click({force: true}).type('50801')

      cy.get('.billing__form > :nth-child(11)').click()
      cy.get('.buy__btn').click({force: true}).then(() => {
        cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Fill all the information!')})})
    
it('11_checkout[Pago] con datos inválidos(numero, direccion, codigo postal)-vacios', () => {
    
      cy.get(':nth-child(1) > input').click({force: true}).type('juan')
      cy.get(':nth-child(2) > input').click({force: true}).type('juan@gmail.com')
      cy.get(':nth-child(3) > input').click({force: true}).type('73854')
      cy.get(':nth-child(4) > select').select('Costa Rica', { force: true })
      cy.get(':nth-child(5) > select').select('Guanacaste', { force: true })
      cy.get(':nth-child(6) > select').select('Tilaran', { force: true })
      cy.get(':nth-child(7) > input').click({force: true}).type('203065')

      cy.get('.billing__form > :nth-child(10)').click()
      cy.get('.buy__btn').click({force: true}).then(() => {
        cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Fill all the information!')})})
    
    
  it('12_checkout[Pago] con datos inválidos(nombre, email, direccion, codigo postal)-vacios', () => {
    
      cy.get(':nth-child(3) > input').click({force: true}).type('73854')
      cy.get(':nth-child(4) > select').select('Costa Rica', { force: true })
      cy.get(':nth-child(5) > select').select('Guanacaste', { force: true })
      cy.get(':nth-child(6) > select').select('Tilaran', { force: true })
      cy.get(':nth-child(8) > input').click({force: true}).type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.')

      cy.get('.billing__form > :nth-child(10)').click()
      cy.get('.buy__btn').click({force: true}).then(() => {
        cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Fill all the information!')})})
    
    
  it('13_checkout[Pago] con datos inválidos(nombre, direccion, codigo postal)-vacios', () => {
    
      cy.get(':nth-child(1) > input').click({force: true}).type('Lorem Ipsum Dolor Sit Amet Consectetur')
      cy.get(':nth-child(2) > input').click({force: true}).type('juan@gmail.com')
      cy.get(':nth-child(3) > input').click({force: true}).type('88324592')
      cy.get(':nth-child(4) > select').select('Costa Rica', { force: true })
      cy.get(':nth-child(5) > select').select('Guanacaste', { force: true })
      cy.get(':nth-child(6) > select').select('Tilaran', { force: true })
      cy.get(':nth-child(8) > input').click({force: true}).type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.')

      cy.get('.billing__form > :nth-child(11)').click()
      cy.get('.buy__btn').click({force: true}).then(() => {
        cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Fill all the information!')})})
    
    
  it('14_checkout[Pago] con datos inválidos(email, celular)-vacios', () => {
    
      cy.get(':nth-child(1) > input').click({force: true}).type('juan')
      cy.get(':nth-child(3) > input').click({force: true}).type('73854')
      cy.get(':nth-child(4) > select').select('Costa Rica', { force: true })
      cy.get(':nth-child(5) > select').select('Guanacaste', { force: true })
      cy.get(':nth-child(6) > select').select('Tilaran', { force: true })
      cy.get(':nth-child(7) > input').click({force: true}).type('50801')
      cy.get(':nth-child(8) > input').click({force: true}).type('Distrito de los ángeles frente la plaza')

      cy.get('.billing__form > :nth-child(11)').click()
      cy.get('.buy__btn').click({force: true}).then(() => {
        cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Fill all the information!')})})
})

//name: cy.get(':nth-child(1) > input')
//email: cy.get(':nth-child(2) > input')
//phone: cy.get(':nth-child(3) > input')
//country: cy.get(':nth-child(4) > select')
//state: cy.get(':nth-child(5) > select')
//city: cy.get(':nth-child(5) > select')
//zp: cy.get(':nth-child(5) > select')
//st address: cy.get(':nth-child(5) > select')


//sinpe: cy.get('.billing__form > :nth-child(10)')
//bak: cy.get('.billing__form > :nth-child(11)')

//btn: cy.get('.buy__btn')