import { defineStore } from 'pinia';

export const useBillSplitStore = defineStore('billSplitStore', {
  state: () => ({
    expenses: JSON.parse(localStorage.getItem('expenses')) || [],
    participants: JSON.parse(localStorage.getItem('participants')) || []
  }),
  
  getters: {
    getAllExpenses: (state) => state.expenses,
    getAllParticipants: (state) => state.participants
  },
  
  actions: {
    addExpense(expense) {
      this.expenses.push(expense);
      this.saveExpenses();
    },
    
    addParticipant(participant) {
      this.participants.push(participant);
      this.saveParticipants();
    },
    
    saveExpenses(expensesList = null) {
      if (expensesList !== null) {
        this.expenses = expensesList;
      }
      localStorage.setItem('expenses', JSON.stringify(this.expenses));
    },
    
    saveParticipants(participantsList = null) {
      if (participantsList !== null) {
        this.participants = participantsList;
      }
      localStorage.setItem('participants', JSON.stringify(this.participants));
    },
    
    // New method to properly clear all data
    clearAll() {
      // Clear localStorage
      localStorage.removeItem('expenses');
      localStorage.removeItem('participants');
      
      // Reset state
      this.expenses = [];
      this.participants = [];
    }
  }
});