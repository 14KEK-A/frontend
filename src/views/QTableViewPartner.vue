<script setup lang="ts">
  import { usePartnerStore } from "../store/partnerStore";
  import { storeToRefs } from "pinia";
  import router from "src/router";
  import { useUsersStore } from "../store/usersStore";

  const partnerStore = usePartnerStore();
  const usersStore = useUsersStore();

  const { isLoading, dataN, selected } = storeToRefs(partnerStore);

  watch(isLoading, () => {
    partnerStore.getAll();
  });

  function deleteRecord(): void {
    partnerStore.deleteById();
  }

  function newRecord(): void {
    partnerStore.data = {};
    router.push("/newpartner");
  }

  function editRecord(): void {
    partnerStore.data = selected.value[0];
    partnerStore.getById();
    router.push("/editpartner");
  }

  function clearSelection(): void {
    selected.value = [];
  }

  const columns: any[] = [
    { name: "_id", label: "_id", field: "_id", align: "left", sortable: true },
    { name: "name", label: "name", field: "name", align: "left", sortable: true },
    { name: "address", label: "address", field: "address", align: "left", sortable: true },
    { name: "email", label: "email", field: "email", align: "left", sortable: true },
    {
      name: "phone_number",
      label: "phone_number",
      field: "phone_number",
      align: "left",
      sortable: true,
    },
    {
      name: "users_id",
      label: "users_id",
      field: "users_id",
      align: "left",
      sortable: true,
    },
  ];

  onMounted(() => {
    partnerStore.getAll();
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
        :rows="dataN"
        selection="multiple"
        title="Partner"
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
