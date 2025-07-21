import { Component } from '@angular/core';

@Component({
  selector: 'app-slot-machine',
  templateUrl: './slot-machine.component.html',
  styleUrls: ['./slot-machine.component.css']
})
export class SlotMachineComponent {
  symbols: string[] = ['🍒', '🍋', '🔔', '💎', '⭐️'];
  reels: string[] = ['🍒', '🍒', '🍒'];

  balance: number = 100;
  spinning: boolean = false;
  message: string = '';

  spinCost = 5;
  winAmount = 20;

  spin() {
    if (this.spinning || this.balance < this.spinCost) return;

    this.spinning = true;
    this.message = '';
    this.balance -= this.spinCost;

    let spins = 10;
    let spinInterval = setInterval(() => {
      this.reels = [
        this.getRandomSymbol(),
        this.getRandomSymbol(),
        this.getRandomSymbol()
      ];
      spins--;

      if (spins === 0) {
        clearInterval(spinInterval);
        this.finishSpin();
        this.spinning = false;
      }
    }, 100);
  }

  getRandomSymbol(): string {
    const index = Math.floor(Math.random() * this.symbols.length);
    return this.symbols[index];
  }

  finishSpin() {
    if (this.reels[0] === this.reels[1] && this.reels[1] === this.reels[2]) {
      this.balance += this.winAmount;
      this.message = '🎉 JACKPOT! You win $' + this.winAmount;
    } else {
      this.message = '😞 Try again!';
    }
  }
}
