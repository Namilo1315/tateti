const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    let currentPlayer = 'X';
    let gameOver = false;
    
    cells.forEach(cell => {
      cell.addEventListener('click', () => {
        if (!gameOver && !cell.textContent) {
          cell.textContent = currentPlayer;
          if (checkWinner()) {
            document.getElementById("resultado").innerHTML =
            `<h2> Ganó el Jugador: ${currentPlayer} !!!!!<h2/> <img src="./estrella.png" alt=""> <br/> <br/> <button type="button" class="btn btn-danger" onclick="volverJugar()">Volver a Jugar</button>`;
            gameOver = true;
          } else if (checkDraw()) {
            document.getElementById("resultado").innerHTML =  `<div> <h3 class=text-center>Han Empatado el Juegdo!!!</h3> 
            <button type="button" class="btn btn-danger" onclick="volverJugar()">Volver a Jugar</button> <div/>`;
          } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          }
        }
      });
    });

  
    function checkWinner() {
      const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6] 
      ];
  
      for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (
          cells[a].textContent &&
          cells[a].textContent === cells[b].textContent &&
          cells[a].textContent === cells[c].textContent
        ) {
          cells[a].classList.add('winning-cell');
          cells[b].classList.add('winning-cell');
          cells[c].classList.add('winning-cell');
          return true;
        }
       }
      return false;
     
      return winningCombos.some(combo => {
        const [a, b, c] = combo;
        return cells[a].textContent &&
          cells[a].textContent === cells[b].textContent &&
          cells[a].textContent === cells[c].textContent;
      });
    
 }
    function checkDraw() {
      return [...cells].every(cell => cell.textContent);
    }


    function volverJugar() {
      cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning-cell'); 
       
      });
      document.getElementById("resultado").innerHTML = '';
      currentPlayer = 'X';
      gameOver = false;
      
      
    }
    
    