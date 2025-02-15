---
title: Templated Pages
queries:
  - orders_by_category: orders_by_category.sql
---

```sql categories
select
category,
'/templated-pages/' || category as category_link,
sum(sales_usd0k) as sales_usd0k
from ${orders_by_category}
group by category
order by sales_usd0k desc
```

<DataTable data={categories} rows=1>
	<Column id=category_link contentType=link />
</DataTable>
