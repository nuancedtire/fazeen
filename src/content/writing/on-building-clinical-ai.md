---
title: "On Building Clinical AI"
description: "Reflections on shipping AI systems inside the NHS and what the implementation gap actually looks like in practice."
pubDate: 2024-03-15
draft: false
---

The gap between what AI can do in a research paper and what it can do in a busy NHS trust is vast. This is the first of a series of essays exploring what I've learned as a clinician who builds.

## The Implementation Gap

Every week seems to bring a new paper claiming superhuman performance on some medical imaging task. The numbers are impressive, often 95%+ sensitivity and specificity. But when you try to deploy these systems in a real hospital, the numbers crash.

Why? The patients in the training sets don't look like the patients in front of you at 3am on a Sunday. The lighting is different, the equipment is different, the artifacts are different.

## What I've Learned

After several years of building and deploying clinical AI systems, a few things have become clear:

1. **Data quality beats model architecture** - A simpler model trained on high-quality, well-labeled data consistently outperforms a sophisticated model trained on messy data.

2. **Workflow integration is 80% of the work** - The model is often the easy part. Getting it to fit into clinical workflows, getting it to alert the right person at the right time, that's where the real work lives.

3. **Explainability matters more than accuracy** - A model that's 90% accurate but explains its reasoning wins over a 95% accurate black box.

More coming soon.
