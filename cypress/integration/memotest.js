/// <reference types="Cypress"/>/

const URL = 'http://127.0.0.1:5500/index.html'

context('Memotest', () => {

    before(() => {
        cy.visit(URL);
    });

    describe('inicia el juego', () => {
        it('clickea sobre el boton Jugar', () => {
            cy.get('#botonJugar').click();
            });
    });

    describe('juega al memotest', () => {
        const numerosCuadro = 12;
        
        it('se asegura que existe un tablero con cuadros', () => {
            cy.get('#tableroJuego').find('.cuadro').should('have.length', numerosCuadro);
        });

        it('se asegura que los cuadros sean aleatorios', () => {
            cy.get('.cuadro').then((cuadros) => {
              let clasesOriginales = [];
              cuadros.each(function(i, cuadro) {
                clasesOriginales.push(cuadro.className);
              });
      
              cy.visit(URL);
              cy.get('#botonJugar').click();

              let clasesNuevas = [];
              cy.get('.cuadro').then(nuevosCuadros => {
                nuevosCuadros.each(function(i, cuadro) {
                  clasesNuevas.push(cuadro.className);
                });
      
                cy.wrap(clasesOriginales).should('not.deep.equal', clasesNuevas);
              });
            });
          });
        

    describe('resuelve el juego', () => {
        let mapaDePares, listaDePares;
        it('elijo una combinacion erronea', ()=>{
            cy.get('.cuadro').then(cuadros => {
                mapaDePares = obtenerParesDeCuadros(cuadros);
                listaDePares = Object.values(mapaDePares);

                console.log(listaDePares);
                cy.get(listaDePares[0][0]).click();
                cy.get(listaDePares[1][0]).click();

                cy.get('.cuadro').should('have.length', numerosCuadro);
            });
        });
        it('resuelvo el juego', () => {
            cy.get('.cuadro').should('have.length', numerosCuadro);

            listaDePares.forEach((par) => {
                cy.get(par[0]).click();
                cy.get(par[1]).click();
            });

            cy.get('.cuadro').should('have.length', 0);

            cy.get('#tableroJuego').should('not.be.visible');
            const numeroTurnos = numerosCuadro / 2 + 1;
            cy.get('#mensajeFin').should('be.visible').contains(`Felicitaciones! Terminaste el juego. Tardaste ${numeroTurnos} turnos`);
        });
    });
});
});


function obtenerParesDeCuadros(cuadros){
    const pares = {};

    cuadros.each((i, cuadro) => {
        const claseColor = cuadro.className.replace('cuadro h-100 ', '');
        
        if(pares[claseColor]) {
            pares[claseColor].push(cuadro);
        } else {
            pares[claseColor] = [cuadro];
        }
    });

    console.log(pares);
    return pares;
}


