import { onMounted, ref } from "vue";
import { api } from "../boot/axios.js";

export function useActivityStats() {
  const counts = ref(null);
  const villages = ref(null);
  const loading = ref(true);

  onMounted(async () => {
    const [countResult, villageResult] = await Promise.allSettled([
      api.get("/activity-records/activity-type-counts"),
      api.get("/villages?expand=records"),
    ]);

    if (countResult.status === "fulfilled") {
      counts.value = Object.fromEntries(
        countResult.value.data.map((item) => [item.activity_id, item.count])
      );
    }
    if (villageResult.status === "fulfilled") {
      villages.value = villageResult.value.data;
    }
    loading.value = false;
  });

  const activityCount = (id) =>
    counts.value === null ? null : counts.value[id] || 0;

  const villageCount = (...ids) => {
    if (villages.value === null) return null;
    return villages.value.filter((village) =>
      (village.records || []).some((record) => ids.includes(record.activity_id))
    ).length;
  };

  const totalVillages = () =>
    villages.value === null ? null : villages.value.length;

  const formatCount = (value) =>
    value === null ? "" : new Intl.NumberFormat("en-IN").format(value);

  return { activityCount, villageCount, totalVillages, formatCount, loading };
}
