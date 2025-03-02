<template>
  <div class="max-w-xl mx-auto p-5 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-custom-teal text-center">Bill Splitting Calculator</h2>
    
    <!-- Expense Input Form -->
    <div class="mb-6">
      <div class="flex gap-2 mb-4">
        <input 
          v-model="newPerson" 
          placeholder="Person Name" 
          class="flex-1 px-3 py-2 bg-custom-gray text-black border border-custom-teal rounded focus:outline-none focus:ring-2 focus:ring-custom-teal"
        />
        <button 
          @click="addPerson" 
          class="px-4 py-2 bg-custom-teal text-white rounded hover:bg-custom-teal-light transition-colors"
        >
          Add Person
        </button>
      </div>

      <!-- People List -->
      <div v-if="people.length > 0" class="mb-4">
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="(person, index) in people" 
            :key="index" 
            class="bg-custom-gray px-3 py-1 rounded-full flex items-center"
          >
            {{ person }}
            <button 
              @click="removePerson(index)" 
              class="ml-2 text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </span>
        </div>
      </div>

      <!-- Expense Entry -->
      <div class="flex gap-2 mb-4">
        <select 
          v-model="selectedPayer" 
          class="flex-1 px-3 py-2 bg-custom-gray text-black border border-custom-teal rounded"
        >
          <option value="" disabled>Select Payer</option>
          <option v-for="(person, index) in people" :key="index" :value="person">
            {{ person }}
          </option>
        </select>
        <input 
          v-model.number="expenseAmount" 
          type="number" 
          placeholder="Amount" 
          class="flex-1 px-3 py-2 bg-custom-gray text-black border border-custom-teal rounded"
        />
        <button 
          @click="addExpense" 
          :disabled="!selectedPayer || !expenseAmount"
          class="px-4 py-2 bg-custom-teal text-white rounded hover:bg-custom-teal-light transition-colors disabled:opacity-50"
        >
          Add Expense
        </button>
      </div>

      <!-- Shared With Selection -->
      <div class="mb-4">
        <label class="block mb-2 text-sm text-gray-600">Shared With:</label>
        <div class="flex flex-wrap gap-2">
          <label 
            v-for="(person, index) in people" 
            :key="index" 
            class="inline-flex items-center"
          >
            <input 
              type="checkbox" 
              :value="person" 
              v-model="selectedSharedPeople"
              class="mr-1 accent-custom-teal"
            />
            {{ person }}
          </label>
        </div>
      </div>

      <!-- Expenses List -->
      <div v-if="expenses.length > 0" class="mb-6">
        <h3 class="text-lg font-semibold mb-2 text-custom-teal">Expenses</h3>
        <div 
          v-for="(expense, index) in expenses" 
          :key="index" 
          class="bg-custom-gray p-3 rounded mb-2 flex justify-between items-center"
        >
          <div>
            <span class="font-medium">{{ expense.payer }}</span> paid 
            <span class="text-custom-teal font-bold">${{ expense.amount.toFixed(2) }}</span> 
            for 
            <span>{{ expense.sharedWith.join(', ') }}</span>
          </div>
          <button 
            @click="removeExpense(index)" 
            class="text-red-500 hover:text-red-700"
          >
            ×
          </button>
        </div>
      </div>

      <!-- Settlement Results -->
      <div v-if="settlementResults.length > 0" class="bg-theme-dark p-4 rounded-lg text-white">
        <h3 class="text-xl font-bold mb-4 text-custom-teal-light">Settlement</h3>
        <div 
          v-for="(settlement, index) in settlementResults" 
          :key="index" 
          class="mb-2"
        >
          {{ settlement }}
        </div>
      </div>

      <!-- Calculate Button -->
      <div class="text-center mt-6">
        <button 
          @click="calculateSettlement" 
          :disabled="expenses.length === 0"
          class="px-6 py-2 bg-custom-teal text-white rounded hover:bg-custom-teal-light transition-colors disabled:opacity-50"
        >
          Calculate Settlement
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const people = ref([])
    const newPerson = ref('')
    const selectedPayer = ref('')
    const expenseAmount = ref(null)
    const selectedSharedPeople = ref([])
    const expenses = ref([])
    const settlementResults = ref([])

    const addPerson = () => {
      if (newPerson.value.trim() && !people.value.includes(newPerson.value.trim())) {
        people.value.push(newPerson.value.trim())
        newPerson.value = ''
      }
    }

    const removePerson = (index) => {
      people.value.splice(index, 1)
      // Remove any expenses involving this person
      expenses.value = expenses.value.filter(
        expense => 
          expense.payer !== people.value[index] && 
          !expense.sharedWith.includes(people.value[index])
      )
    }

    const addExpense = () => {
      if (selectedPayer.value && expenseAmount.value && selectedSharedPeople.value.length > 0) {
        expenses.value.push({
          payer: selectedPayer.value,
          amount: expenseAmount.value,
          sharedWith: [...selectedSharedPeople.value]
        })
        
        // Reset inputs
        selectedPayer.value = ''
        expenseAmount.value = null
        selectedSharedPeople.value = []
      }
    }

    const removeExpense = (index) => {
      expenses.value.splice(index, 1)
    }

    const calculateSettlement = () => {
      // Calculate total expenses per person
      const balances = {}
      people.value.forEach(person => {
        balances[person] = 0
      })

      // Track how much each person has paid and should pay
      expenses.value.forEach(expense => {
        const splitAmount = expense.amount / expense.sharedWith.length
        
        // Payer gets credited
        balances[expense.payer] += expense.amount
        
        // Shared people get debited
        expense.sharedWith.forEach(person => {
          balances[person] -= splitAmount
        })
      })

      // Generate settlement instructions
      const results = []
      const sortedPeople = Object.keys(balances)

      for (let i = 0; i < sortedPeople.length; i++) {
        for (let j = i + 1; j < sortedPeople.length; j++) {
          const person1 = sortedPeople[i]
          const person2 = sortedPeople[j]
          
          if (balances[person1] > 0 && balances[person2] < 0) {
            const settleAmount = Math.min(
              balances[person1], 
              Math.abs(balances[person2])
            )
            
            if (settleAmount > 0.01) {
              results.push(`${person2} owes ${person1} $${settleAmount.toFixed(2)}`)
              balances[person1] -= settleAmount
              balances[person2] += settleAmount
            }
          }
        }
      }

      settlementResults.value = results
    }

    return {
      people,
      newPerson,
      addPerson,
      removePerson,
      selectedPayer,
      expenseAmount,
      selectedSharedPeople,
      addExpense,
      expenses,
      removeExpense,
      calculateSettlement,
      settlementResults
    }
  }
}
</script>