# PaPA: Pick-and-Place Anything

**Towards Scaling Robotic Manipulation: Leveraging World Knowledge as Automated Teleoperator**

Unghui Nam, Minji Bae, Donghoon Kim, Suyun Lee, Byonghyo Shim<sup>†</sup>
Seoul National University &nbsp;·&nbsp; <sup>†</sup>Corresponding author

[**Project page**](https://ungungnam.github.io/PaPA/) &nbsp;·&nbsp;
[**Paper**](docs/static/paper/PaPA_main.pdf) &nbsp;·&nbsp;
[**Supplementary**](docs/static/paper/PaPA_supplementary.pdf)

---

## Overview

Collecting real-world manipulation data is the bottleneck in scaling robot learning. Today that data comes almost entirely from expert teleoperation, which demands continuous low-level human control, specialized hardware, and carefully calibrated environments.

**PaPA** removes the human from the control loop. It grounds open-vocabulary language instructions into explicit geometric representations using the world knowledge already encoded in vision-language models, then autonomously generates robot-executable pick-and-place trajectories. Human supervision collapses to a single post-hoc binary label per episode.

| | |
|---|---|
| Behavior cloning success | **97.5%** — matching expert teleoperation |
| Data collection rate | **~2.0** episodes / minute |
| Human effort | **1.16** interventions / episode |
| Data yield | up to **90.9%** of attempted rollouts |

### Pipeline

1. **Perception via world knowledge** — a zero-shot VLM (InternVL3-8B) infers a preferred approach direction and textual descriptors for the target object and the placement region; Grounded-SAM turns those descriptors into per-view semantic masks.
2. **Trajectory planning** — masks are back-projected into silhouette cones and intersected across calibrated cameras (visual hull) to recover the object point cloud; a PCA-based grasp estimator gives the pick and place poses, which are interpolated into a smooth, kinematically feasible trajectory.
3. **Trajectory validation** — the rollout is executed and recorded; a supervisor supplies one binary success label. Successes enter the dataset, failures are discarded.

## Repository layout

```
docs/                     GitHub Pages project website
  index.html
  static/css/             stylesheet
  static/js/              theme toggle, scroll-spy
  static/images/          paper figures
  static/videos/          demo video + poster frame
  static/paper/           main paper and supplementary material (PDF)
```

Code for the PaPA pipeline will be released in this repository.

## Project page

The website is served by GitHub Pages from the `docs/` directory on `main`:
<https://ungungnam.github.io/PaPA/>

To preview it locally:

```bash
python3 -m http.server 8000 --directory docs
# then open http://localhost:8000
```

## Hardware

AgileX PiPER 6-DoF arm with a two-finger gripper, and three RGB cameras — one wrist-mounted plus two fixed workspace cameras (Intel RealSense D455 and L515). Extrinsics are calibrated with AprilTag-based methods and standard hand–eye calibration.
