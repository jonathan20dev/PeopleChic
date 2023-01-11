describe('empty spec', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/dashboard/banner')
  })
  
  it('01_Banner con datos válidos', () => {
    cy.get(':nth-child(1) > input').click({force: true}).type("oferta limitada")
    cy.get(':nth-child(2) > input').click({force: true}).type("no te lo puedes perder")
    cy.get(':nth-child(3) > input').click({force: true}).type("2023-01-15")
    cy.get(':nth-child(4) > input').selectFile('C:/Users/Jonathan/Downloads/manta-de-punto.jpg', { force: true }, { action: 'drag-drop' })

    cy.get('.buy__btn').click({force: true}).then(() => {
        cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Banner editado exitosamente')})
    })
  
    it('02_Banner con datos inválidos (Título, subtitulo, imagen)-vacios', () => {
        cy.get(':nth-child(3) > input').click({force: true}).type("2023-01-15")

        cy.get('.buy__btn').click({force: true}).then(() => {
            cy.get('.mb-4').should('contain.text', 'Editar Banner')})
        })
       
  
  
    it('03_Banner con datos inválidos (Título, subtitulo, imagen)', () => {
        cy.get(':nth-child(1) > input').click({force: true}).type("Lorem Ipsum Dolor Sit Amet Consectetur")
        cy.get(':nth-child(2) > input').click({force: true}).type("Lorem Ipsum Dolor Sit Amet")
        cy.get(':nth-child(3) > input').click({force: true}).type("2023-01-15")
        cy.get(':nth-child(4) > input').selectFile('C:/Users/Jonathan/Downloads/Avance3_Jonathan_Mendoza.pdf', { force: true }, { action: 'drag-drop' })

        cy.get('.buy__btn').click({force: true}).then(() => {
            cy.get('.mb-4').should('contain.text', 'Editar Banner')})
       })
  
  
    it('04_Banner con datos inválidos ( subtitulo, fecha, imagen)-vacios', () => {
        cy.get(':nth-child(1) > input').click({force: true}).type("oferta limitada")
        cy.get(':nth-child(4) > input').selectFile('C:/Users/Jonathan/Downloads/Avance3_Jonathan_Mendoza.pdf', { force: true }, { action: 'drag-drop' })

        cy.get('.buy__btn').click({force: true}).then(() => {
            cy.get('.mb-4').should('contain.text', 'Editar Banner')})
       })
  
  
    it('05_Banner con datos inválidos (Título, fecha)-vacios', () => {
        cy.get(':nth-child(2) > input').click({force: true}).type("no te lo puedes perder")
        cy.get(':nth-child(4) > input').selectFile('C:/Users/Jonathan/Downloads/manta-de-punto.jpg', { force: true }, { action: 'drag-drop' })

        cy.get('.buy__btn').click({force: true}).then(() => {
            cy.get('.mb-4').should('contain.text', 'Editar Banner')})
       })
  
  
    it('06_Banner con datos inválidos (Título, fecha, imagen)-vacios', () => {
        cy.get(':nth-child(1) > input').click({force: true}).type("Lorem Ipsum Dolor Sit Amet Consectetur")
        cy.get(':nth-child(2) > input').click({force: true}).type("no te lo puedes perder")

        cy.get('.buy__btn').click({force: true}).then(() => {
            cy.get('.mb-4').should('contain.text', 'Editar Banner')})
       })
  
  
    it('07_Banner con datos inválidos ( subtitulo, fecha, imagen)-vacios', () => {
        cy.get(':nth-child(1) > input').click({force: true}).type("oferta limitada")
        cy.get(':nth-child(2) > input').click({force: true}).type("Lorem Ipsum Dolor Sit Amet Consectetur")
        cy.get(':nth-child(3) > input').click({force: true}).type("2023-01-10")

        cy.get('.buy__btn').click({force: true}).then(() => {
            cy.get('.mb-4').should('contain.text', 'Editar Banner')})
        })
  
  
    it('08_Banner con datos inválidos (Título, fecha, imagen)-vacios', () => {
        cy.get(':nth-child(2) > input').click({force: true}).type("no te lo puedes perder")
        cy.get(':nth-child(3) > input').click({force: true}).type("2023-01-10")
        cy.get(':nth-child(4) > input').selectFile('C:/Users/Jonathan/Downloads/Avance3_Jonathan_Mendoza.pdf', { force: true }, { action: 'drag-drop' })

        cy.get('.buy__btn').click({force: true}).then(() => {
            cy.get('.mb-4').should('contain.text', 'Editar Banner')})
        })
  
  
    it('09_Banner con datos inválidos (Título, subtitulo, fecha)-vacios', () => {
        cy.get(':nth-child(1) > input').click({force: true}).type("Lorem Ipsum Dolor Sit Amet Consectetur")
        cy.get(':nth-child(3) > input').click({force: true}).type("2023-01-10")
        cy.get(':nth-child(4) > input').selectFile('C:/Users/Jonathan/Downloads/manta-de-punto.jpg', { force: true }, { action: 'drag-drop' })

        cy.get('.buy__btn').click({force: true}).then(() => {
            cy.get('.mb-4').should('contain.text', 'Editar Banner')})
        })
  
  
    it('10_Banner con datos inválidos (Título, subtitulo, fecha, imagen)-vacios', () => {
        cy.get(':nth-child(2) > input').click({force: true}).type("Lorem Ipsum Dolor Sit Amet Consectetur")
        cy.get(':nth-child(3) > input').click({force: true}).type("2151-01-01")
        cy.get(':nth-child(4) > input').selectFile('C:/Users/Jonathan/Downloads/manta-de-punto.jpg', { force: true }, { action: 'drag-drop' })

        cy.get('.buy__btn').click({force: true}).then(() => {
            cy.get('.mb-4').should('contain.text', 'Editar Banner')})
        })
      
  it('11_Banner con datos inválidos ( fecha, imagen)-vacios', () => {
    cy.get(':nth-child(1) > input').click({force: true}).type("oferta limitada")
    cy.get(':nth-child(2) > input').click({force: true}).type("no te lo puedes perder")
    cy.get(':nth-child(3) > input').click({force: true}).type("2151-01-01")

    cy.get('.buy__btn').click({force: true}).then(() => {
        cy.get('.mb-4').should('contain.text', 'Editar Banner')})
        })
      
      
    it('12_Banner con datos inválidos (Título, subtitulo, fecha, imagen)-vacios', () => {
        cy.get(':nth-child(1) > input').click({force: true}).type("Lorem Ipsum Dolor Sit Amet Consectetur")
        cy.get(':nth-child(3) > input').click({force: true}).type("2151-01-01")
        cy.get(':nth-child(4) > input').selectFile('C:/Users/Jonathan/Downloads/Avance3_Jonathan_Mendoza.pdf', { force: true }, { action: 'drag-drop' })

        cy.get('.buy__btn').click({force: true}).then(() => {
            cy.get('.mb-4').should('contain.text', 'Editar Banner')})
        })
      
      
    it('13_Banner con datos inválidos (Título, subtitulo, fecha)-vacios', () => {
        cy.get(':nth-child(1) > input').click({force: true}).type("oferta limitada")
        cy.get(':nth-child(2) > input').click({force: true}).type("Lorem Ipsum Dolor Sit Amet Consectetur")
        cy.get(':nth-child(4) > input').selectFile('C:/Users/Jonathan/Downloads/manta-de-punto.jpg', { force: true }, { action: 'drag-drop' })

        cy.get('.buy__btn').click({force: true}).then(() => {
            cy.get('.mb-4').should('contain.text', 'Editar Banner')})
       })
  })
  