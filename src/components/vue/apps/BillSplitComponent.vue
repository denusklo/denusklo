<template>
  <div>
    <h3 class="text-xl font-bold mb-4 text-custom-teal">Split Your Bill</h3>
    
    <!-- Participants Section -->
    <div class="mb-6">
      <h4 class="text-lg font-semibold mb-2 text-custom-teal">Participants</h4>
      <div class="flex gap-2 mb-3">
        <input 
          type="text" 
          v-model="newParticipant" 
          placeholder="Add participant name..."
          @keyup.enter="addParticipant"
          class="flex-1 px-3 py-2 bg-custom-gray text-black border border-custom-teal rounded focus:outline-none focus:ring-2 focus:ring-custom-teal"
        />
        <button 
          @click="addParticipant" 
          class="px-4 py-2 bg-custom-teal text-white rounded hover:bg-custom-teal-light transition-colors font-medium"
        >
          Add
        </button>
      </div>
      
      <!-- Participants List -->
      <div v-if="participants.length > 0" class="mb-4 flex flex-wrap gap-2">
        <div 
          v-for="(participant, index) in participants" 
          :key="index"
          class="bg-custom-beige px-3 py-1.5 rounded-full flex items-center gap-2"
        >
          <span class="text-black">{{ participant.name }}</span>
          <button 
            @click="removeParticipant(index)" 
            class="text-red-500 hover:text-red-700 transition-colors"
          >
            ×
          </button>
        </div>
      </div>
      <div v-else class="text-gray-500 mb-4 text-center">
        No participants added yet. Add at least 2 participants.
      </div>
    </div>
    
    <!-- Expenses Section -->
    <div class="mb-6">
      <h4 class="text-lg font-semibold mb-2 text-custom-teal">Expenses</h4>
      
      <!-- Add Expense Form -->
      <div class="bg-custom-gray p-4 rounded mb-4">
        <div class="mb-3">
          <label class="block text-sm font-medium mb-1 text-black">Description</label>
          <input 
            type="text" 
            v-model="newExpense.description" 
            placeholder="e.g., Dinner, Movie tickets..."
            class="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-custom-teal"
          />
        </div>
        
        <div class="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label class="block text-sm font-medium mb-1 text-black">Currency</label>
            <select
              v-model="selectedCurrency"
              class="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-custom-teal"
            >
              <option value="USD">USD ($)</option>
              <option value="VND">VND (₫)</option>
              <option value="MYR">MYR (RM)</option>
              <option value="SGD">SGD (S$)</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1 text-black">Amount ({{ getCurrencySymbol(selectedCurrency) }})</label>
            <input
              type="number"
              v-model="newExpense.amount"
              min="0"
              :step="selectedCurrency === 'VND' ? '1000' : '0.01'"
              :placeholder="selectedCurrency === 'VND' ? '0' : '0.00'"
              class="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-custom-teal"
            />
          </div>
        </div>
        
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1 text-black">Paid by</label>
          <select 
            v-model="newExpense.paidBy" 
            class="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-custom-teal"
          >
            <option value="" disabled>Select who paid</option>
            <option v-for="(participant, index) in participants" :key="index" :value="participant.id">
              {{ participant.name }}
            </option>
          </select>
        </div>
        
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1 text-black">Split among</label>
          <div class="space-y-2">
            <div v-for="(participant, index) in participants" :key="index" class="flex items-center">
              <input 
                type="checkbox" 
                :id="`split-${participant.id}`" 
                v-model="newExpense.splitAmong" 
                :value="participant.id" 
                class="mr-2 accent-custom-teal"
              />
              <label :for="`split-${participant.id}`" class="text-black">{{ participant.name }}</label>
            </div>
          </div>
        </div>
        
        <button 
          @click="addExpense" 
          class="w-full px-4 py-2 bg-custom-teal text-white rounded hover:bg-custom-teal-light transition-colors font-medium"
          :disabled="!canAddExpense"
        >
          Add Expense
        </button>
      </div>
      
      <!-- Expenses List -->
      <div v-if="expenses.length > 0" class="space-y-3">
        <div
          v-for="(expense, index) in expenses"
          :key="index"
          class="relative"
        >
          <div class="bg-custom-gray p-3 rounded flex justify-between items-center">
            <div>
              <div class="font-medium text-black">{{ expense.description }}</div>
              <div class="text-sm text-gray-600">
                Paid by {{ getParticipantName(expense.paidBy) }} • Split among {{ expense.splitAmong.length }} people
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="font-bold text-black">{{ formatAmount(expense.amount, expense.currency) }}</div>
              <button
                @click="toggleExpenseDetails(index)"
                class="text-custom-teal hover:text-custom-teal-light transition-colors p-1"
                title="Show split participants"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
              </button>
              <button
                @click="removeExpense(index)"
                class="text-red-500 hover:text-red-700 transition-colors"
              >
                ×
              </button>
            </div>
          </div>

          <!-- Expense Details Card -->
          <div
            v-if="expandedExpense === index"
            class="mt-2 bg-custom-beige p-3 rounded border-l-4 border-custom-teal"
          >
            <h5 class="font-medium text-custom-teal mb-2">Split Participants:</h5>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="participantId in expense.splitAmong"
                :key="participantId"
                class="bg-white px-2 py-1 rounded text-sm text-black"
              >
                {{ getParticipantName(participantId) }}
              </span>
            </div>
            <div class="mt-2 text-sm text-gray-600">
              Each person pays: {{ formatAmount(expense.amount / expense.splitAmong.length, expense.currency) }}
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-gray-500 text-center">
        No expenses added yet.
      </div>
    </div>
    
    <!-- Results Section -->
    <div v-if="expenses.length > 0" class="mb-4">
      <h4 class="text-lg font-semibold mb-3 text-custom-teal">Settlements</h4>
      <div class="bg-custom-gray p-4 rounded">
        <div v-if="settlements.length > 0" class="space-y-2">
          <div v-for="(settlement, index) in settlements" :key="index" class="flex justify-between items-center py-1">
            <div>
              <span class="font-medium text-black">{{ getParticipantName(settlement.from) }}</span> <span class="text-black">owes </span> 
              <span class="font-medium text-black">{{ getParticipantName(settlement.to) }}</span>
            </div>
            <div class="font-bold text-black">{{ formatAmount(settlement.amount, settlement.currency) }}</div>
          </div>
        </div>
        <div v-else class="text-center text-gray-500">
          Everyone is settled up!
        </div>
      </div>
    </div>
    
    <div class="mt-6 flex justify-between">
      <button 
        @click="reset" 
        class="px-4 py-2 border border-red-400 text-red-500 rounded hover:bg-red-400 hover:text-white transition-colors"
      >
        Reset All
      </button>
      <button 
        @click="calculateSettlements" 
        class="px-4 py-2 bg-custom-teal text-white rounded hover:bg-custom-teal-light transition-colors font-medium"
        :disabled="expenses.length === 0"
      >
        Recalculate
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useBillSplitStore } from '@/scripts/billSplitStore.js';
import { v4 as uuidv4 } from 'uuid';

export default {
  setup() {
    const store = useBillSplitStore();
    
    // State
    const participants = ref([]);
    const expenses = ref([]);
    const settlements = ref([]);
    const newParticipant = ref('');
    const selectedCurrency = ref('USD');
    const expandedExpense = ref(null);
    const newExpense = ref({
      description: '',
      amount: '',
      paidBy: '',
      splitAmong: []
    });

    // Currency configuration
    const currencies = {
      USD: { symbol: '$', name: 'USD' },
      VND: { symbol: '₫', name: 'VND' },
      MYR: { symbol: 'RM', name: 'MYR' },
      SGD: { symbol: 'S$', name: 'SGD' }
    };
    
    // Load data from store
    onMounted(() => {
      // Make sure we're getting fresh data from the store
      store.$reset(); // Reset to initial state which loads from localStorage
      participants.value = [...store.getAllParticipants]; // Create new array reference
      expenses.value = [...store.getAllExpenses]; // Create new array reference
      
      if (expenses.value.length > 0) {
        calculateSettlements();
      }
    });
    
    // Computed properties
    const canAddExpense = computed(() => {
      return newExpense.value.description.trim() !== '' && 
             newExpense.value.amount > 0 && 
             newExpense.value.paidBy && 
             newExpense.value.splitAmong.length > 0;
    });
    
    // Methods
    const addParticipant = () => {
      if (newParticipant.value.trim() !== '') {
        const participant = {
          id: uuidv4(),
          name: newParticipant.value.trim()
        };
        // Only add to the store, then get the updated list from the store
        store.addParticipant(participant);
        participants.value = store.getAllParticipants;
        newParticipant.value = '';
      }
    };
    
    const removeParticipant = (index) => {
      const removedId = participants.value[index].id;
      // Clone and update the arrays
      const updatedParticipants = [...participants.value];
      updatedParticipants.splice(index, 1);
      
      // Update expenses to remove the participant
      const updatedExpenses = expenses.value.map(expense => {
        const newExpense = {...expense};
        if (newExpense.paidBy === removedId) {
          newExpense.paidBy = '';
        }
        newExpense.splitAmong = newExpense.splitAmong.filter(id => id !== removedId);
        return newExpense;
      });
      
      // Save to store
      store.saveParticipants(updatedParticipants);
      store.saveExpenses(updatedExpenses);
      
      // Update local refs from store
      participants.value = store.getAllParticipants;
      expenses.value = store.getAllExpenses;
      
      calculateSettlements();
    };
    
    const addExpense = () => {
      if (canAddExpense.value) {
        const expense = {
          id: uuidv4(),
          description: newExpense.value.description,
          amount: parseFloat(newExpense.value.amount),
          currency: selectedCurrency.value,
          paidBy: newExpense.value.paidBy,
          splitAmong: [...newExpense.value.splitAmong],
          date: new Date()
        };
        // Only add to the store, then get the updated list from the store
        store.addExpense(expense);
        expenses.value = store.getAllExpenses;
        
        // Reset form
        newExpense.value = {
          description: '',
          amount: '',
          paidBy: '',
          splitAmong: []
        };
        
        calculateSettlements();
      }
    };
    
    const removeExpense = (index) => {
      // Clone the array and remove the item
      const updatedExpenses = [...expenses.value];
      updatedExpenses.splice(index, 1);
      
      // Save to store and update local ref
      store.saveExpenses(updatedExpenses);
      expenses.value = store.getAllExpenses;
      
      calculateSettlements();
    };
    
    const getParticipantName = (id) => {
      const participant = participants.value.find(p => p.id === id);
      return participant ? participant.name : 'Unknown';
    };
    
    const calculateSettlements = () => {
      // Initialize balances for each participant
      let balances = {};
      participants.value.forEach(p => {
        balances[p.id] = 0;
      });
      
      // Calculate who paid what and who owes what
      expenses.value.forEach(expense => {
        if (!expense.paidBy || expense.splitAmong.length === 0) return;
        
        // Add the full amount to the payer's balance
        balances[expense.paidBy] += expense.amount;
        
        // Subtract each person's share from their balance
        const shareAmount = expense.amount / expense.splitAmong.length;
        expense.splitAmong.forEach(participantId => {
          balances[participantId] -= shareAmount;
        });
      });
      
      // Convert balances to settlements
      settlements.value = [];

      // Group expenses by currency for proper settlement calculation
      const expensesByCurrency = {};
      expenses.value.forEach(expense => {
        if (!expensesByCurrency[expense.currency]) {
          expensesByCurrency[expense.currency] = [];
        }
        expensesByCurrency[expense.currency].push(expense);
      });

      // Calculate settlements for each currency separately
      Object.entries(expensesByCurrency).forEach(([currency, currencyExpenses]) => {
        const currencyBalances = {};
        participants.value.forEach(p => {
          currencyBalances[p.id] = 0;
        });

        // Calculate balances for this currency
        currencyExpenses.forEach(expense => {
          if (!expense.paidBy || expense.splitAmong.length === 0) return;

          currencyBalances[expense.paidBy] += expense.amount;
          const shareAmount = expense.amount / expense.splitAmong.length;
          expense.splitAmong.forEach(participantId => {
            currencyBalances[participantId] -= shareAmount;
          });
        });

        // Create settlements for this currency
        let debtors = [];
        let creditors = [];

        Object.entries(currencyBalances).forEach(([id, balance]) => {
          if (balance < -0.01) {
            debtors.push({ id, balance: Math.abs(balance) });
          } else if (balance > 0.01) {
            creditors.push({ id, balance });
          }
        });

        debtors.sort((a, b) => b.balance - a.balance);
        creditors.sort((a, b) => b.balance - a.balance);

        while (debtors.length > 0 && creditors.length > 0) {
          const debtor = debtors[0];
          const creditor = creditors[0];
          const amount = Math.min(debtor.balance, creditor.balance);

          if (amount > 0.01) {
            settlements.value.push({
              from: debtor.id,
              to: creditor.id,
              amount,
              currency
            });
          }

          debtor.balance -= amount;
          creditor.balance -= amount;

          if (debtor.balance < 0.01) debtors.shift();
          if (creditor.balance < 0.01) creditors.shift();
        }
      });
    };
    
    const reset = () => {
      if (confirm('Are you sure you want to reset all participants and expenses?')) {
        // Use the store's clearAll method to properly reset everything
        store.clearAll();
        
        // Reset local component state
        participants.value = [];
        expenses.value = [];
        settlements.value = [];
        
        // Reset the form
        newParticipant.value = '';
        selectedCurrency.value = 'USD';
        newExpense.value = {
          description: '',
          amount: '',
          paidBy: '',
          splitAmong: []
        };
      }
    };
    
    // Helper methods
    const getCurrencySymbol = (currencyCode) => {
      return currencies[currencyCode]?.symbol || '$';
    };

    const formatAmount = (amount, currency) => {
      const symbol = getCurrencySymbol(currency);
      if (currency === 'VND') {
        return `${symbol}${Math.round(amount).toLocaleString()}`;
      }
      return `${symbol}${amount.toFixed(2)}`;
    };

    const toggleExpenseDetails = (index) => {
      expandedExpense.value = expandedExpense.value === index ? null : index;
    };

    return {
      participants,
      expenses,
      settlements,
      newParticipant,
      newExpense,
      selectedCurrency,
      expandedExpense,
      canAddExpense,
      addParticipant,
      removeParticipant,
      addExpense,
      removeExpense,
      getParticipantName,
      calculateSettlements,
      getCurrencySymbol,
      formatAmount,
      toggleExpenseDetails,
      reset
    };
  }
};
</script>