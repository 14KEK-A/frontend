<script setup lang="ts">
  import { useRatingStore } from "../store/ratingStore";
  import { storeToRefs } from "pinia";
  import router from "src/router";
  import { useUsersStore } from "../store/usersStore";
  import { watch, onMounted } from "vue";

  const ratingStore = useRatingStore();
  const usersStore = useUsersStore();

  const { isLoading, ratings, selected } = storeToRefs(ratingStore);

  watch(isLoading, () => {
    ratingStore.getAll();
  });

  function deleteRecord(): void {
    ratingStore.deleteById();
  }

  function newRecord(): void {
    ratingStore.rating = {};
    router.push("/newrating");
  }

  function editRecord(): void {
    ratingStore.rating = selected.value[0];
    ratingStore.getById();
    router.push("/editrating");
  }

  function clearSelection(): void {
    selected.value = [];
  }

  const columns: any[] = [
    { name: "_id", label: "_id", field: "_id", align: "left", sortable: true },
    { name: "star", label: "star", field: "star", align: "left", sortable: true },
    { name: "comment", label: "comment", field: "comment", align: "left", sortable: true },
  ];

  onMounted(() => {
    ratingStore.getAll();
  });
</script>

<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        v-model:selected="selected"
        binary-state-sort
        :columns="columns"
        dense
        row-key="_id"
        :rows="ratings"
        selection="multiple"
        title="Rating"
        wrap-cells
      ></q-table>
      <!-- Buttons:  -->
      <div class="row justify-center q-ma-sm q-gutter-sm">
        <q-btn v-show="selected.length != 0" color="orange" no-caps @click="clearSelection">
          {{ selected.length > 1 ? "Clear selections" : "Clear selection" }}
        </q-btn>
        <q-btn
          v-show="usersStore.loggedUser && selected.length == 0"
          color="green"
          no-caps
          @click="newRecord"
        >
          New record
        </q-btn>
        <q-btn v-show="selected.length == 1" color="blue" no-caps @click="editRecord">
          Edit record
        </q-btn>
        <q-btn v-show="selected.length != 0" color="red" no-caps @click="deleteRecord">
          {{ selected.length > 1 ? "Delete selected records" : "Delete selected record" }}
        </q-btn>
      </div>
      <!-- <p>Pagination object: {{ pagination }}</p> -->
      <!-- <p>Selected array: {{ selected }}</p> -->
      <!-- <div>Filter: "{{ pagination.filter }}"</div> -->
    </div>
  </q-page>
</template>

<style scoped></style>
