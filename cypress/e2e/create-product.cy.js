describe('empty spec', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/dashboard/add-products/')
  })
  //No se pudo agregar el producto
    

  it('01_crearProducto[Pago] con datos válidos', () => {
  
    cy.get('form > :nth-child(1) > input').click({force: true}).type('Cobija')
    cy.get(':nth-child(2) > input').click({force: true}).type('Cobija Tejida.')
    cy.get(':nth-child(3) > input').click({force: true}).type('Cobija Tejida,hecha de algodón,perfecta para los días helados.')
    cy.get('.d-flex > :nth-child(1) > input').click({force: true}).type('45')
    cy.get('.w-100').select('Vestido', { force: true })
    //
    cy.get(':nth-child(5) > .form__group > input').selectFile('C:/Users/Jonathan/Downloads/manta-de-punto.jpg', { force: true }, { action: 'drag-drop' })
    
    cy.get('[type="submit"]').click({force: true}).then(() => {
      cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Producto añadido exitosamente!')})})

    it('02_crearProducto[Pago] con datos inválidos: nombre, descripción, descipción corta, precio, imagen', () => {
  
        cy.get('.w-100').select('Vestido', { force: true })
        
        cy.get('[type="submit"]').click()
        cy.get('.buy__btn').click({force: true}).then(() => {
          cy.get('.mb-4').should('contain.text', '')})})

          it('03_crearProducto[Pago] con datos inválidos: descripción, precio', () => {
  
        cy.get('form > :nth-child(1) > input').click({force: true}).type('Lorem Ipsum Dolor Sit Amet Consectetur')
        cy.get(':nth-child(2) > input').click({force: true}).type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aen')
        cy.get(':nth-child(3) > input').click({force: true}).type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.')
        cy.get('.d-flex > :nth-child(1) > input').click({force: true}).type('-1')
        cy.get('.w-100').select('Vestido', { force: true })
        //
        cy.get(':nth-child(5) > .form__group > input').selectFile('C:/Users/Jonathan/Downloads/Avance3_Jonathan_Mendoza.pdf', { force: true }, { action: 'drag-drop' })
        
        cy.get('[type="submit"]').click({force: true}).then(() => {
          cy.get('tbody > :nth-child(1) > :nth-child(2)').should('contain.text', 'Lorem Ipsum Dolor Sit Amet Consectetur')})})

          it('04_crearProducto[Pago] con datos inválidos: descripción', () => {
  
        cy.get('form > :nth-child(1) > input').click({force: true}).type('Cobija')
        cy.get(':nth-child(2) > input').click({force: true}).type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aen')
        cy.get('.d-flex > :nth-child(1) > input').click({force: true}).type('45')
        cy.get('.w-100').select('Vestido', { force: true })
        //
        cy.get(':nth-child(5) > .form__group > input').selectFile('C:/Users/Jonathan/Downloads/manta-de-punto.jpg', { force: true }, { action: 'drag-drop' })
        
        cy.get('[type="submit"]').click()
        cy.get('.buy__btn').click({force: true}).then(() => {
          cy.get('.mb-4').should('contain.text', 'Añadir producto')})})

          it('05_crearProducto[Pago] con datos inválidos: nombre', () => {
  
        cy.get(':nth-child(2) > input').click({force: true}).type('Cobija Tejida.')
        cy.get(':nth-child(3) > input').click({force: true}).type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.')
        cy.get('.d-flex > :nth-child(1) > input').click({force: true}).type('45')
        cy.get('.w-100').select('Vestido', { force: true })
        //
        
        cy.get('[type="submit"]').click()
        cy.get('.buy__btn').click({force: true}).then(() => {
          cy.get('.mb-4').should('contain.text', 'Añadir producto')})})


          it('06_crearProducto[Pago] con datos inválidos: nombre, descripcion corta, precio y img', () => {
  
        cy.get('form > :nth-child(1) > input').click({force: true}).type('Lorem Ipsum Dolor Sit Amet Consectetur')
        cy.get(':nth-child(3) > input').click({force: true}).type('Cobija Tejida,hecha de algodón,perfecta para los días helados.')
        cy.get('.w-100').select('Vestido', { force: true })
        //
        cy.get(':nth-child(5) > .form__group > input').selectFile('C:/Users/Jonathan/Downloads/Avance3_Jonathan_Mendoza.pdf', { force: true }, { action: 'drag-drop' })
        
        cy.get('[type="submit"]').click()
        cy.get('.buy__btn').click({force: true}).then(() => {
          cy.get('.mb-4').should('contain.text', 'Añadir producto')})})


          it('07_crearProducto[Pago] con datos inválidos: descripción corta, precio', () => {
  
        cy.get('form > :nth-child(1) > input').click({force: true}).type('Cobija')
        cy.get(':nth-child(3) > input').click({force: true}).type('Cobija Tejida,hecha de algodón,perfecta para los días helados.')
        cy.get('.d-flex > :nth-child(1) > input').click({force: true}).type('-1')
        cy.get('.w-100').select('Vestido', { force: true })
        
        cy.get('[type="submit"]').click()
        cy.get('.buy__btn').click({force: true}).then(() => {
          cy.get('.mb-4').should('contain.text', 'Añadir producto')})})

          it('08_crearProducto[Pago] con datos inválidos: nombre, descripción', () => {
  
        cy.get('form > :nth-child(1) > input').click({force: true}).type('Lorem Ipsum Dolor Sit Amet Consectetur')
        cy.get(':nth-child(2) > input').click({force: true}).type('Cobija Tejida.')
        cy.get('.d-flex > :nth-child(1) > input').click({force: true}).type('45')
        cy.get('.w-100').select('Vestido', { force: true })
        //
        cy.get(':nth-child(5) > .form__group > input').selectFile('C:/Users/Jonathan/Downloads/manta-de-punto.jpg', { force: true }, { action: 'drag-drop' })
        
        cy.get('[type="submit"]').click()
        cy.get('.buy__btn').click({force: true}).then(() => {
          cy.get('.mb-4').should('contain.text', 'Añadir producto')})})

          it('09_crearProducto[Pago] con datos inválidos: descripción, precio, imagen', () => {
  
        cy.get('form > :nth-child(1) > input').click({force: true}).type('Cobija')
        cy.get(':nth-child(3) > input').click({force: true}).type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Descripción Corta: Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aen')
        cy.get('.w-100').select('Vestido', { force: true })
        //
        cy.get(':nth-child(5) > .form__group > input').selectFile('C:/Users/Jonathan/Downloads/Avance3_Jonathan_Mendoza.pdf', { force: true }, { action: 'drag-drop' })
        
        cy.get('[type="submit"]').click()
        cy.get('.buy__btn').click({force: true}).then(() => {
          cy.get('.mb-4').should('contain.text', 'Añadir producto')})})


          it('10_crearProducto[Pago] con datos inválidos: nombre, precio y imagen', () => {
  
        cy.get(':nth-child(2) > input').click({force: true}).type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aen.')
        cy.get(':nth-child(3) > input').click({force: true}).type('Cobija Tejida,hecha de algodón,perfecta para los días helados.')
        cy.get('.d-flex > :nth-child(1) > input').click({force: true}).type('-1')
        cy.get('.w-100').select('Vestido', { force: true })
        
        cy.get('[type="submit"]').click()
        cy.get('.buy__btn').click({force: true}).then(() => {
          cy.get('.mb-4').should('contain.text', 'Añadir producto')})})


          it('11_crearProducto[Pago] con datos inválidos: descripción y precio', () => {
  
        cy.get('form > :nth-child(1) > input').click({force: true}).type('Cobija')
        cy.get(':nth-child(2) > input').click({force: true}).type('Cobija Tejida.')
        cy.get('.d-flex > :nth-child(1) > input').click({force: true}).type('cincuenta')
        cy.get('.w-100').select('Vestido', { force: true })
        //
        cy.get(':nth-child(5) > .form__group > input').selectFile('C:/Users/Jonathan/Downloads/manta-de-punto.jpg', { force: true }, { action: 'drag-drop' })
        
        cy.get('[type="submit"]').click()
        cy.get('.buy__btn').click({force: true}).then(() => {
          cy.get('.mb-4').should('contain.text', 'Añadir producto')})})


          it('12_crearProducto[Pago] con datos inválidos: descripción, precio y imagen', () => {
  
        cy.get('form > :nth-child(1) > input').click({force: true}).type('Cobija')
        cy.get(':nth-child(2) > input').click({force: true}).type('Cobija Tejida.')
        cy.get('.w-100').select('Vestido', { force: true })
        //
        
        cy.get('[type="submit"]').click()
        cy.get('.buy__btn').click({force: true}).then(() => {
          cy.get('.mb-4').should('contain.text', 'Añadir producto')})})


          it('13_crearProducto[Pago] con datos inválidos: nombre, descripción, precio y imagen', () => {
  
        cy.get(':nth-child(2) > input').click({force: true}).type('Cobija Tejida.')
        cy.get('.d-flex > :nth-child(1) > input').click({force: true}).type('-1')
        cy.get('.w-100').select('Vestido', { force: true })
        //
        cy.get(':nth-child(5) > .form__group > input').selectFile('C:/Users/Jonathan/Downloads/Avance3_Jonathan_Mendoza.pdf', { force: true }, { action: 'drag-drop' })
        
        cy.get('[type="submit"]').click()
        cy.get('.buy__btn').click({force: true}).then(() => {
          cy.get('.mb-4').should('contain.text', 'Añadir producto')})})


          it('14_crearProducto[Pago] con datos inválidos: nombre, descripción, imagen', () => {
  
        cy.get('form > :nth-child(1) > input').click({force: true}).type('Lorem Ipsum Dolor Sit Amet Consectetur')
        cy.get(':nth-child(3) > input').click({force: true}).type(' Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.')
        cy.get('.d-flex > :nth-child(1) > input').click({force: true}).type('45')
        cy.get('.w-100').select('Vestido', { force: true })
        //
        cy.get(':nth-child(5) > .form__group > input').selectFile('C:/Users/Jonathan/Downloads/Avance3_Jonathan_Mendoza.pdf', { force: true }, { action: 'drag-drop' })
        
        cy.get('[type="submit"]').click()
        cy.get('.buy__btn').click({force: true}).then(() => {
          cy.get('.mb-4').should('contain.text', 'Añadir producto')})})


          it('15_crearProducto[Pago] con datos inválidos: descripción, precio', () => {
  
        cy.get('form > :nth-child(1) > input').click({force: true}).type('Cobija')
        cy.get(':nth-child(3) > input').click({force: true}).type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.')
        cy.get('.d-flex > :nth-child(1) > input').click({force: true}).type('cincuenta')
        cy.get('.w-100').select('Vestido', { force: true })
        //
        cy.get(':nth-child(5) > .form__group > input').selectFile('C:/Users/Jonathan/Downloads/manta-de-punto.jpg', { force: true }, { action: 'drag-drop' })
        
        cy.get('[type="submit"]').click()
        cy.get('.buy__btn').click({force: true}).then(() => {
          cy.get('.mb-4').should('contain.text', 'Añadir producto')})})


          it('16_crearProducto[Pago] con datos inválidos: descripción, imagen', () => {
  
        cy.get(':nth-child(2) > input').click({force: true}).type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aen')
        cy.get(':nth-child(3) > input').click({force: true}).type('Cobija Tejida,hecha de algodón,perfecta para los días helados.')
        cy.get('.d-flex > :nth-child(1) > input').click({force: true}).type('45')
        cy.get('.w-100').select('Vestido', { force: true })
        //
        cy.get(':nth-child(5) > .form__group > input').selectFile('C:/Users/Jonathan/Downloads/Avance3_Jonathan_Mendoza.pdf', { force: true }, { action: 'drag-drop' })
        
        cy.get('[type="submit"]').click()
        cy.get('.buy__btn').click({force: true}).then(() => {
          cy.get('.mb-4').should('contain.text', 'Añadir producto')})})


          it('17_crearProducto[Pago] con datos inválidos: nombre, descripción, imagen', () => {
  
        cy.get('form > :nth-child(1) > input').click({force: true}).type('Lorem Ipsum Dolor Sit Amet Consectetur')
        cy.get(':nth-child(2) > input').click({force: true}).type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aen.')
        cy.get('.w-100').select('Vestido', { force: true })
        //
        cy.get(':nth-child(5) > .form__group > input').selectFile('C:/Users/Jonathan/Downloads/Avance3_Jonathan_Mendoza.pdf', { force: true }, { action: 'drag-drop' })
        
        cy.get('[type="submit"]').click()
        cy.get('.buy__btn').click({force: true}).then(() => {
          cy.get('.mb-4').should('contain.text', 'Añadir producto')})})

          it('18_crearProducto[Pago] con datos inválidos: precio', () => {
  
        cy.get(':nth-child(2) > input').click({force: true}).type('Cobija Tejida.')
        cy.get(':nth-child(3) > input').click({force: true}).type('Cobija Tejida,hecha de algodón,perfecta para los días helados.')
        cy.get('.d-flex > :nth-child(1) > input').click({force: true}).type('-1')
        cy.get('.w-100').select('Vestido', { force: true })
        //
        cy.get(':nth-child(5) > .form__group > input').selectFile('C:/Users/Jonathan/Downloads/manta-de-punto.jpg', { force: true }, { action: 'drag-drop' })
        
        cy.get('[type="submit"]').click()
        cy.get('.buy__btn').click({force: true}).then(() => {
          cy.get('.mb-4').should('contain.text', 'Añadir producto')})})

          

  })